import "./App.css";
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
  }, [debouncedUsername]);

  return (
    <>
      <p>MVST - Work in Progress!</p>
      <input
        type="text"
        onChange={({ target }) => setUsername(target.value)}
        placeholder="username"
      />
      {username && <h1>Repositories from {debouncedUsername[0]}</h1>}
      {!username && !data && !error && (
        <p>
          <strong>Type a username to search for repositories!</strong>
        </p>
      )}
      {loading && !data && (
        <p>
          <strong>Loading...</strong>
        </p>
      )}
      {error && <p>{error.message}</p>}
      <RepositoriesList>
        {repositories?.map((repository: Repository) => {
          return <RepositoryItem key={repository.id} repository={repository} />;
        })}
      </RepositoriesList>
      <ToastContainer />
    </>
  );
}

export default App;
