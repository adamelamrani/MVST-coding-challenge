import { ApolloError } from "@apollo/client";
import { UserData } from "../repositoryItem/RepositoryInterface";

export interface FormInputProps {
  query: string;
  data: UserData;
  error: ApolloError | undefined;
}
