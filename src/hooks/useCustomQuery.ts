/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentNode, useQuery } from "@apollo/client";
import { toastSelector } from "../utils/toasts/toastSelector";
import { ToastTypeEnum } from "../utils/toasts/ToastTypeEnum";

/**
 * This custom hook is a generic hook that we can use to execute a query.
 *
 * @param query The query function that we want to execute
 * @param variables Variables that we want to pass to the query. ie: { id: 1 }
 * @param skip (Optional) If we want to skip the query (default: false)
 * @returns loading, error, data and refetch from the result of the query
 *
 * @example
 * const { loading, error, data } = useCustomQuery(GET_ALL_USERS, {}, value);
 * const { loading, error, data } = useCustomQuery(GET_ALL_USERS, {}, value, true);
 * const { loading, error, data } = useCustomQuery(GET_ALL_USERS, { id: 1 }, value);
 * const { loading, error, data } = useCustomQuery(GET_ALL_USERS, { id: 1 }, value, true);
 */

const useCustomQuery = (
  query: DocumentNode,
  variables: any,
  skip?: boolean
) => {
  const { loading, error, data, refetch } = useQuery(query, {
    variables,
    skip: skip,
  });

  if (error?.networkError) {
    toastSelector(ToastTypeEnum.ERROR, error, null)();
  }

  return { loading, error, data, refetch };
};

export default useCustomQuery;
