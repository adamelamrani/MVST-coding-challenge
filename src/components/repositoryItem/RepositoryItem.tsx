import { RepositoryItemProps } from "./RepositoryInterface";
import RepositoryStyle from "./repositoryItem.module.css";

const RepositoryItem = ({ repository }: RepositoryItemProps): JSX.Element => {
  console.log(repository);
  return (
    <li className={RepositoryStyle.repositoryItem}>
      <header className={RepositoryStyle.repositoryItemHeader}>
        <h3 className={RepositoryStyle.itemHeading}>
          <a
            className={RepositoryStyle.anchorStyle}
            href={repository.url}
            target="_blank"
          >
            {repository.name}
          </a>
        </h3>
        <div>
          <span className={RepositoryStyle.starIcon}>⭐</span>
          <span>{repository?.stargazers.totalCount}</span>
        </div>
      </header>
      <div className={RepositoryStyle.mainBlock}>
        <p className={RepositoryStyle.repositoryParagraph}>
          {repository.description
            ? repository.description
            : "No description provided"}
        </p>

        {repository?.languages?.nodes.length > 0 && (
          <ul className={RepositoryStyle.languagesList}>
            {repository.languages.nodes.map((language) => (
              <li className={RepositoryStyle.language} key={language.name}>
                {language.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

export default RepositoryItem;
