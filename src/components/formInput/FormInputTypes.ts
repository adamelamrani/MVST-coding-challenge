import { ApolloError } from "@apollo/client";
import { UserData } from "../repositoryItem/RepositoryInterface";

export interface FormInputProps {
  username: string;
  data: UserData;
  error: ApolloError | undefined;
  onChange: (event: string) => void;
}
