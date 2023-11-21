/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentNode, useQuery } from "@apollo/client";
import { toastSelector } from "../utils/toasts/toastSelector";
import { ToastTypeEnum } from "../utils/toasts/ToastTypeEnum";
import { useDebounce } from "use-debounce";

const useCustomQuery = (query: DocumentNode, variables: any, value: string) => {
  const debouncedUsername = useDebounce(value, 500);
  const params = window.location.search.replace("?query=", "");
  const { loading, error, data } = useQuery(query, {
    variables,
    skip: !debouncedUsername[0] && !params,
  });

  if (error) {
    toastSelector(ToastTypeEnum.ERROR, error, null)();
  }
  if (data && value !== "") {
    toastSelector(ToastTypeEnum.SUCCESS, null, null)();
  }

  return { loading, error, data };
};

export default useCustomQuery;
