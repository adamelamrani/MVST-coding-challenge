import { Repository } from "../repositoryItem/RepositoryInterface";
import RepositoryItem from "../repositoryItem/RepositoryItem";
import styles from "./repositoriesList.module.css";

interface RepositoriesListProps {
  repositories: Repository[];
}

const RepositoriesList: React.FC<RepositoriesListProps> = ({
  repositories,
}) => {
  return (
    <ul data-testid="listStyle" className={styles.listStyle}>
      {repositories?.map((repository: Repository, index: number) => {
        return (
          <RepositoryItem
            key={`${index}_${repository.id}`}
            repository={repository}
          />
        );
      })}
    </ul>
  );
};

export default RepositoriesList;
