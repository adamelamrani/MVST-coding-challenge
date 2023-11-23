import { RepositoryItemProps } from "./RepositoryInterface";
import RepositoryStyle from "./repositoryItem.module.css";

const RepositoryItem = ({ repository }: RepositoryItemProps): JSX.Element => {
  console.log(repository);
  return (
    <li className={RepositoryStyle.repositoryItem}>
      <p className={RepositoryStyle.repositoryParagraph}>
        <strong>{repository.name}</strong> {repository.description}
        <a className={RepositoryStyle.anchorStyle} href={repository.url}>
          Access Repository
        </a>
      </p>
    </li>
  );
};

export default RepositoryItem;
