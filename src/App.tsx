import "./App.css";
import RepositoriesList from "./components/repositoriesList/RepositoriesList";
import RepositoryItem from "./components/repositoryItem/RepositoryItem";
import { useQuery, gql } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSelector } from "./utils/toasts/toastSelector";
import { ToastTypeEnum } from "./utils/toasts/ToastTypeEnum";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Repository } from "./components/repositoryItem/RepositoryInterface";

const GET_REPOSITORIES = gql`
  query GetRepositories($username: String!) {
    user(login: $username) {
      repositories(first: 10, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          id
          name
          description
          url
          stargazers {
            totalCount
          }
          languages(first: 3) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

function App() {
  const [username, setUsername] = useState<string | null>();
  const debouncedUsername = useDebounce(username, 500);
  const params = window.location.search.replace("?query=", "");
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: {
      username: debouncedUsername[0] || params,
    },
    skip: !debouncedUsername[0] && !params,
  });

  if (error) {
    toastSelector(ToastTypeEnum.ERROR, error, null)();
  }
  if (data && username !== "") {
    toastSelector(ToastTypeEnum.SUCCESS, null, null)();
  }
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
