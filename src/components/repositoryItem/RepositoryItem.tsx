import { RepositoryItemProps } from "./RepositoryInterface";
import styles from "./repositoryItem.module.css";

const RepositoryItem = ({ repository }: RepositoryItemProps): JSX.Element => {
  return (
    <li className={styles.repositoryItem}>
      <header className={styles.repositoryItemHeader}>
        <h3 className={styles.itemHeading}>
          <a
            className={styles.anchorStyle}
            href={repository.url}
            target="_blank"
          >
            {repository.name}
          </a>
        </h3>
        <div>
          <span className={styles.starIcon}>⭐</span>
          <span>{repository?.stargazers.totalCount}</span>
        </div>
      </header>
      <div className={styles.mainBlock}>
        <p className={styles.repositoryParagraph}>
          {repository.description
            ? repository.description
            : "No description provided"}
        </p>

        {repository?.languages?.nodes.length > 0 && (
          <ul className={styles.languagesList}>
            {repository.languages.nodes.map((language) => (
              <li className={styles.language} key={language.name}>
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
