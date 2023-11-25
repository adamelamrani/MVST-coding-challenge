import { ApolloError } from "@apollo/client";
import { Repository } from "../repositoryItem/RepositoryInterface";

export interface FormInputProps {
  username: string;
  data: Repository[];
  error: ApolloError | undefined;
  onChange: (event: string) => void;
}
