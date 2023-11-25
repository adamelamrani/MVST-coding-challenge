import styles from "./styles/App.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { GET_REPOSITORIES } from "./graphql/Repositories";
import useCustomQuery from "./hooks/useCustomQuery";
import FormInput from "./components/formInput/FormInput";
import PaginationComponent from "./components/paginationComponent/PaginationComponent";
import Results from "./components/results/Results";

function App() {
  const [username, setUsername] = useState<string | null>();
  const debouncedUsername = useDebounce(username, 500);
  const params = window.location.search.replace("?query=", "");

  const { loading, error, data, refetch } = useCustomQuery(
    GET_REPOSITORIES,
    {
      username: debouncedUsername[0] || params,
      first: 10,
    },
    !debouncedUsername[0] && !params
  );

  const { pageInfo } = data?.user?.repositories || {};

  const handlePagination = (direction: string) => {
    if (
      (direction === "next" && pageInfo?.hasNextPage) ||
      (direction === "prev" && pageInfo?.hasPreviousPage)
    ) {
      const variables = {
        username: debouncedUsername[0] || params,
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
      <FormInput
        username={username as string}
        onChange={setUsername}
        data={data}
        error={error}
      />
      {data && (username || params) && (
        <h2>Repositories from {username ? username : params}</h2>
      )}
      <Results
        repositories={data?.user.repositories.nodes}
        error={error}
        loading={loading}
      />
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
