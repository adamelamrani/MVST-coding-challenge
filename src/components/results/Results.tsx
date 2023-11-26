import RepositoriesList from "../repositoriesList/RepositoriesList";
import styles from "./results.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Results = ({ repositories, error, loading }: any) => {
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
      {repositories && <RepositoriesList repositories={repositories} />}
      {repositories?.length === 0 && !error && <p>No repositories found</p>}
    </>
  );
};

export default Results;
