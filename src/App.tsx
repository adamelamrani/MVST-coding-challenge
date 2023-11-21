import "./App.css";
import RepositoriesList from "./components/repositoriesList/RepositoriesList";
import { Repository } from "./components/repositoryItem/RepositoryInterface";
import RepositoryItem from "./components/repositoryItem/RepositoryItem";
import { useQuery, gql } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSelector } from "./utils/toasts/toastSelector";
import { ToastTypeEnum } from "./utils/toasts/ToastTypeEnum";

const mockupRepositories: Repository[] = [
  {
    id: "1",
    name: "React Repository",
    description: "A JavaScript library for building user interfaces.",
    html_url: "https://github.com/facebook/react",
  },
  {
    id: "2",
    name: "Node.js Repository",
    description:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    html_url: "https://github.com/nodejs/node",
  },
];

const GET_REPOSITORIES = gql`
  query GetRepositories($number_of_repos: Int!) {
    viewer {
      name
      repositories(last: $number_of_repos) {
        nodes {
          name
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: {
      number_of_repos: 3,
    },
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

  return (
    <>
      <p>MVST - Work in Progress!</p>
      <RepositoriesList>
        {mockupRepositories.map((repository) => {
          return (
            <RepositoryItem key={repository.name} repository={repository} />
          );
        })}
      </RepositoriesList>
      <ToastContainer />
    </>
  );
}

export default App;
