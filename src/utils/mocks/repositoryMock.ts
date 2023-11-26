import { UserData } from "../../components/repositoryItem/RepositoryInterface";
import { GET_REPOSITORIES } from "../../graphql/Repositories";

export const repositoryMockSuccess = [
  {
    request: {
      query: GET_REPOSITORIES,
      variables: {
        query: "user:adam",
        first: 10,
      },
    },
    result: {
      data: {
        search: {
          nodes: [
            {
              __typename: "Repository",
              id: "MDEwOlJlcG9zaXRvcnkxMjM0NTY3ODk=",
              name: "Repository For Testing",
              description: "test",
              url: "adamelamrani.com",
              languages: {
                nodes: [
                  {
                    name: "JavaScript",
                    color: "#f1e05a",
                    id: "MDg6TGFuZ3VhZ2Ux",
                  },
                ],
              },
              stargazers: {
                totalCount: 1,
              },
            },
          ],
          pageInfo: {
            endCursor: "Y3Vyc29yOnYyOpHOA3Z7ZQ==",
            startCursor: "Y3Vyc29yOnYyOpHOA3Z7ZQ==",
            hasPreviousPage: false,
            hasNextPage: false,
          },
        },
      },
    },
  },
];

export const repositoryMockSuccessNoValue = [
  {
    request: {
      query: GET_REPOSITORIES,
      variables: {
        query: "user:adam",
        first: 10,
      },
    },
    result: {
      data: {
        search: {
          nodes: [],
        },
      },
    },
  },
];

export const repositoryMockError = [
  {
    request: {
      query: GET_REPOSITORIES,
      variables: {
        query: "user:adam",
        first: 10,
      },
    },
    error: new Error("Fetching data error"),
  },
];

export const mockedData: UserData = {
  search: {
    nodes: [
      {
        id: "MDEwOlJlcG9zaXRvcnkxMjM0NTY3ODk=",
        name: "Repository For Testing",
        description: "test",
        url: "adamelamrani.com",
        languages: {
          nodes: [
            {
              name: "JavaScript",
              color: "#f1e05a",
              id: "MDg6TGFuZ3VhZ2Ux",
            },
          ],
        },
        stargazers: {
          totalCount: 1,
        },
      },
    ],
    pageInfo: {
      endCursor: "Y3Vyc29yOnYyOpHOA3Z7ZQ==",
      startCursor: "Y3Vyc29yOnYyOpHOA3Z7ZQ==",
      hasPreviousPage: false,
      hasNextPage: false,
    },
  },
};
