import { RepositoryItemProps } from "./RepositoryInterface";
import RepositoryStyle from "./repositoryItem.module.css";

const RepositoryItem = ({ repository }: RepositoryItemProps): JSX.Element => {
  console.log(repository);
  return (
    <li className={RepositoryStyle.repositoryItem}>
      <header className={RepositoryStyle.repositoryItemHeader}>
        <h3 className={RepositoryStyle.itemHeading}>{repository.name}</h3>
        <div>
          <span className={RepositoryStyle.starIcon}>⭐</span>
          <span>{repository?.stargazers.totalCount}</span>
        </div>
      </header>
      <div>
        {repository?.description && (
          <p className={RepositoryStyle.repositoryParagraph}>
            {repository.description}
          </p>
        )}

        {repository?.languages?.nodes.length > 0 && (
          <ul className={RepositoryStyle.languagesList}>
            {repository.languages.nodes.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
        )}
      </div>
      <a className={RepositoryStyle.anchorStyle} href={repository.url}>
        Access Repository
      </a>
    </li>
  );
};

export default RepositoryItem;
