import "./App.css";
import RepositoriesList from "./components/repositoriesList/RepositoriesList";
import { Repository } from "./components/repositoryItem/RepositoryInterface";
import RepositoryItem from "./components/repositoryItem/RepositoryItem";
import { useQuery, gql } from "@apollo/client";

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

  if (loading) console.log("Loading...");
  if (error) console.log(`Error! ${error.message}`);
  console.log(data);

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
    </>
  );
}

export default App;
