import { gql, DocumentNode } from "@apollo/client";

export const GET_REPOSITORIES: DocumentNode = gql`
  query GetRepositories(
    $username: String!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    user(login: $username) {
      repositories(
        first: $first
        after: $after
        last: $last
        before: $before
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        pageInfo {
          endCursor
          startCursor
          hasPreviousPage
          hasNextPage
        }
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
