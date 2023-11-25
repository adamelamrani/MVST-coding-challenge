import { Repository } from "../repositoryItem/RepositoryInterface";
import RepositoryItem from "../repositoryItem/RepositoryItem";
import ListStyleCss from "./repositoriesList.module.css";

interface RepositoriesListProps {
  repositories: Repository[];
}

const RepositoriesList: React.FC<RepositoriesListProps> = ({
  repositories,
}) => {
  return (
    <ul data-testid="listStyle" className={ListStyleCss.listStyle}>
      {repositories?.map((repository: Repository) => {
        return <RepositoryItem key={repository.id} repository={repository} />;
      })}
    </ul>
  );
};

export default RepositoriesList;
