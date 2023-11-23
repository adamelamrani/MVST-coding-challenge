import { DocumentNode, gql } from "@apollo/client";

export const GET_REPOSITORIES: DocumentNode = gql`
  query GetRepositories($username: String!) {
    user(login: $username) {
      repositories(first: 10, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          id
          name
          description
          url
          stargazers {
            totalCount
          }
          languages(first: 3) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;
