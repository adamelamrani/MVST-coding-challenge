import AppCss from "./styles/App.module.css";
import RepositoriesList from "./components/repositoriesList/RepositoriesList";
import RepositoryItem from "./components/repositoryItem/RepositoryItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  PageInfo,
  Repository,
} from "./components/repositoryItem/RepositoryInterface";
import { GET_REPOSITORIES } from "./graphql/Repositories";
import useCustomQuery from "./hooks/useCustomQuery";
import FormInput from "./components/fromInput/FormInput";

function App() {
  const [username, setUsername] = useState<string | null>();
  const [pagination, setPagination] = useState<PageInfo>();
  const debouncedUsername = useDebounce(username, 500);
  const params = window.location.search.replace("?query=", "");

  const { loading, error, data, refetch } = useCustomQuery(
    GET_REPOSITORIES,
    {
      username: debouncedUsername[0] || params,
      first: 10,
    },
    debouncedUsername[0] as string,
    !debouncedUsername[0] && !params
  );

  useEffect(() => {
    if (debouncedUsername[0]) {
      const query = new URLSearchParams(window.location.search);
      query.set("query", encodeURIComponent(debouncedUsername[0]));

      window.history.replaceState({}, "", `${location.pathname}?${query}`);
    }

    if (username === "") {
      window.history.replaceState({}, "", "/");
    }
  }, [debouncedUsername, username]);

  useEffect(() => {
    if (data) {
      setPagination(data.user.repositories.pageInfo);
    }
  }, [data]);

  const handlePagination = (direction: string) => {
    if (
      (direction === "next" && pagination?.hasNextPage) ||
      (direction === "prev" && pagination?.hasPreviousPage)
    ) {
      const variables = {
        username: debouncedUsername[0] || params,
        first: direction === "next" ? 10 : undefined,
        after: direction === "next" ? pagination?.endCursor : undefined,
        last: direction === "prev" ? 10 : undefined,
        before: direction === "prev" ? pagination?.startCursor : undefined,
      };
      refetch(variables);
    }
  };

  return (
    <>
      <header className={AppCss.headerStyle}>
        <h1 className={AppCss.mainHeading}>MVST - Code Challenge</h1>
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
      {loading && (
        <div className={AppCss.loadingOverlay}>
          <div className={AppCss.spinner}></div>
        </div>
      )}
      {error && <p>{error.message}</p>}
      {data?.user.repositories.nodes ? (
        <RepositoriesList>
          {data?.user.repositories.nodes?.map((repository: Repository) => {
            return (
              <RepositoryItem key={repository.id} repository={repository} />
            );
          })}
        </RepositoriesList>
      ) : (
        <p>No repositories found</p>
      )}
      {!(!pagination?.hasNextPage && !pagination?.hasPreviousPage) && (
        <div className={AppCss.buttonsBlock}>
          <button
            disabled={!pagination?.hasPreviousPage}
            onClick={() => handlePagination("prev")}
          >
            Previous
          </button>
          <button
            disabled={!pagination?.hasNextPage}
            onClick={() => handlePagination("next")}
          >
            Next
          </button>
        </div>
      )}
      <footer className={AppCss.footerStyle}></footer>
      <ToastContainer />
    </>
  );
}

export default App;
