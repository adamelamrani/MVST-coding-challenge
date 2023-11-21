import "./App.css";
import RepositoriesList from "./components/repositoriesList/RepositoriesList";
import RepositoryItem from "./components/repositoryItem/RepositoryItem";
import { useQuery, gql } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSelector } from "./utils/toasts/toastSelector";
import { ToastTypeEnum } from "./utils/toasts/ToastTypeEnum";
import { useState } from "react";
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
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: {
      username: debouncedUsername[0],
    },
    skip: !debouncedUsername[0],
  });

  if (loading && !data) {
    toastSelector(ToastTypeEnum.LOADING, null, null)();
  }
  if (error) {
    toastSelector(ToastTypeEnum.ERROR, error, null)();
  }
  if (data) {
    toastSelector(ToastTypeEnum.SUCCESS, null, null)();
  }
  const repositories: Repository[] = data?.user.repositories.nodes;

  return (
    <>
      <p>MVST - Work in Progress!</p>
      <input
        type="text"
        onChange={({ target }) => setUsername(target.value)}
        placeholder="username"
      />
      {username && <h1>Repositories from {username}</h1>}
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
