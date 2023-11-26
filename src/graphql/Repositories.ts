import { gql, DocumentNode } from "@apollo/client";

export const GET_REPOSITORIES: DocumentNode = gql`
  query GetRepositories(
    $first: Int
    $last: Int
    $query: String!
    $after: String
    $before: String
  ) {
    search(
      query: $query
      type: REPOSITORY
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
      nodes {
        ... on Repository {
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
              color
              id
            }
          }
        }
      }
    }
  }
`;
