import { PaginationComponentProps } from "./PaginationComponentsTypes";
import PaginationCss from "./pagination.module.css";

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
      <div className={PaginationCss.buttonsBlock}>
        <button
          className={PaginationCss.buttonStyle}
          disabled={!canPreviousPage}
          onClick={() => handlePagination("prev")}
        >
          Previous
        </button>
        <button
          className={PaginationCss.buttonStyle}
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
