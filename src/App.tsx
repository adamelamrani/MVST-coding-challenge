import styles from "./styles/App.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { GET_REPOSITORIES } from "./graphql/Repositories";
import useCustomQuery from "./hooks/useCustomQuery";
import FormInput from "./components/formInput/FormInput";
import PaginationComponent from "./components/paginationComponent/PaginationComponent";
import Results from "./components/results/Results";
import { useNavigate, useSearchParams } from "react-router-dom";

function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [debouncedUsername] = useDebounce(username, 500);
  const query = searchParams.get("query") || "";

  const { loading, error, data, refetch } = useCustomQuery(
    GET_REPOSITORIES,
    {
      username: query,
      first: 10,
    },
    !query
  );

  const { pageInfo } = data?.user?.repositories || {};
  const { nodes: repos } = data?.user?.repositories || [];

  const handlePagination = (direction: string) => {
    if (
      (direction === "next" && pageInfo?.hasNextPage) ||
      (direction === "prev" && pageInfo?.hasPreviousPage)
    ) {
      const variables = {
        username: debouncedUsername || query,
        first: direction === "next" ? 10 : undefined,
        after: direction === "next" ? pageInfo?.endCursor : undefined,
        last: direction === "prev" ? 10 : undefined,
        before: direction === "prev" ? pageInfo?.startCursor : undefined,
      };
      refetch(variables);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (query && !debouncedUsername) {
      navigate({ search: `?query=${query}` });
      return;
    }
    if (debouncedUsername !== query) {
      navigate({ search: `?query=${debouncedUsername}` });
      return;
    }
    if (debouncedUsername === "" && query !== "") {
      navigate({ search: "" });
    }
  }, [debouncedUsername]);

  useEffect(() => {
    setUsername(query);
  }, [query]);
  console.log({ debouncedUsername, query, username });
  return (
    <>
      <header className={styles.headerStyle}>
        <h1 className={styles.mainHeading}>MVST - Code Challenge</h1>
      </header>
      <FormInput
        username={username as string}
        onChange={setUsername}
        data={data}
        error={error}
      />
      {data && (username || query) && (
        <h2>Repositories from {username ? username : query}</h2>
      )}
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
