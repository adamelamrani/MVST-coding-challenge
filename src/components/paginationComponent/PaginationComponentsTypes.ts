export interface PaginationComponentProps {
  canPreviousPage: boolean | undefined;
  canNextPage: boolean | undefined;
  handlePagination: (type: string) => void;
}
