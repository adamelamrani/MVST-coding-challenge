import { RepositoryItemProps } from "./RepositoryInterface";
import RepositoryStyle from "./repositoryItem.module.css";

const RepositoryItem = ({ repository }: RepositoryItemProps): JSX.Element => {
  return (
    <li className={RepositoryStyle.repositoryItem}>
      <p className={RepositoryStyle.repositoryParagraph}>
        <strong>{repository.name}</strong> {repository.description}
        <a href={repository.html_url}>Access Repository</a>
      </p>
    </li>
  );
};

export default RepositoryItem;
