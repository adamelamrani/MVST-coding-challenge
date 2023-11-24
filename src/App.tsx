import AppCss from "./styles/App.module.css";
import RepositoriesList from "./components/repositoriesList/RepositoriesList";
import RepositoryItem from "./components/repositoryItem/RepositoryItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Repository } from "./components/repositoryItem/RepositoryInterface";
import { GET_REPOSITORIES } from "./graphql/Repositories";
import useCustomQuery from "./hooks/useCustomQuery";

function App() {
  const [username, setUsername] = useState<string | null>();
  const debouncedUsername = useDebounce(username, 500);
  const params = window.location.search.replace("?query=", "");

  const { loading, error, data } = useCustomQuery(
    GET_REPOSITORIES,
    {
      username: debouncedUsername[0] || params,
    },
    debouncedUsername[0] as string,
    !debouncedUsername[0] && !params
  );

  const repositories: Repository[] = data?.user.repositories.nodes;

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

  return (
    <>
      <header className={AppCss.headerStyle}>
        <h1 className={AppCss.mainHeading}>MVST - Code Challenge</h1>
      </header>
      {!username && !data && !error && (
        <label className={AppCss.labelStyle} htmlFor="username-input">
          <strong>Type a username to search for repositories!</strong>
        </label>
      )}
      <input
        id="username-input"
        className={AppCss.inputStyle}
        type="text"
        onChange={({ target }) => setUsername(target.value)}
        placeholder="username"
      />
      {data && (username || params) && (
        <h2>Repositories from {username ? username : params}</h2>
      )}
      {loading && !data && (
        <p>
          <strong>Loading...</strong>
        </p>
      )}
      {error && <p>{error.message}</p>}
      {repositories && (
        <RepositoriesList>
          {repositories?.map((repository: Repository) => {
            return (
              <RepositoryItem key={repository.id} repository={repository} />
            );
          })}
        </RepositoriesList>
      )}
      <footer className={AppCss.footerStyle}>
        <button>Previous</button>
        <button>Next</button>
      </footer>
      <ToastContainer />
    </>
  );
}

export default App;
