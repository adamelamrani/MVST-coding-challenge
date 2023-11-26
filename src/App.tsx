import styles from "./styles/App.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCustomQuery from "./hooks/useCustomQuery";
import FormInput from "./components/formInput/FormInput";
import PaginationComponent from "./components/paginationComponent/PaginationComponent";
import Results from "./components/results/Results";
import { useSearchParams } from "react-router-dom";
import { GET_REPOSITORIES } from "./graphql/Repositories";

const createGithubQuery = (user: string, language?: string, repo?: string) => {
  if (repo) {
    return `repo:${user}/${repo}`;
  }
  if (language) {
    return `user:${user} language:${language}`;
  }
  return `user:${user}`;
};

function App() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const language = searchParams.get("language") || "";
  const repo = searchParams.get("repo") || "";
  const { loading, error, data, refetch } = useCustomQuery(
    GET_REPOSITORIES,
    {
      query: createGithubQuery(query, language, repo),
      first: 10,
    },
    !query
  );
  console.log(repo);
  const { pageInfo } = data?.search || {};
  const { nodes: repos } = data?.search || [];
  console.log(pageInfo);
  const handlePagination = (direction: string) => {
    if (
      (direction === "next" && pageInfo?.hasNextPage) ||
      (direction === "prev" && pageInfo?.hasPreviousPage)
    ) {
      const variables = {
        username: query,
        first: direction === "next" ? 10 : undefined,
        after: direction === "next" ? pageInfo?.endCursor : undefined,
        last: direction === "prev" ? 10 : undefined,
        before: direction === "prev" ? pageInfo?.startCursor : undefined,
      };
      refetch(variables);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={styles.headerStyle}>
        <h1 className={styles.mainHeading}>MVST - Code Challenge</h1>
      </header>
      <FormInput query={query as string} data={data} error={error} />
      {data && query && <h2>Repositories from {query}</h2>}
      <Results repositories={repos} error={error} loading={loading} />
      {data && (
        <PaginationComponent
          handlePagination={handlePagination}
          canNextPage={pageInfo?.hasNextPage}
          canPreviousPage={pageInfo?.hasPreviousPage}
        />
      )}
      <footer className={styles.footerStyle}></footer>
      <ToastContainer />
    </>
  );
}

export default App;
