import { PaginationComponentProps } from "./PaginationComponentsTypes";
import styles from "./pagination.module.css";

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  canNextPage,
  canPreviousPage,
  handlePagination,
}): JSX.Element => {
  if (!canNextPage && !canPreviousPage) {
    return <></>;
  }

  return (
    <>
      <div className={styles.buttonsBlock}>
        <button
          className={styles.buttonStyle}
          disabled={!canPreviousPage}
          onClick={() => handlePagination("prev")}
        >
          Previous
        </button>
        <button
          className={styles.buttonStyle}
          disabled={!canNextPage}
          onClick={() => handlePagination("next")}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PaginationComponent;
