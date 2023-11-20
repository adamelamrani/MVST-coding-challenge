import "./App.css";
import RepositoriesList from "./components/repositoriesList/RepositoriesList";
import { Repository } from "./components/repositoryItem/RepositoryInterface";
import RepositoryItem from "./components/repositoryItem/RepositoryItem";

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
  // Add more mockup repositories as needed
];

function App() {
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
