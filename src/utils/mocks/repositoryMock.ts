import { GET_REPOSITORIES } from "../../graphql/Repositories";

export const repositoryMockSuccess = [
  {
    request: {
      query: GET_REPOSITORIES,
      variables: {
        username: "adam",
      },
    },
    result: {
      data: {
        user: {
          repositories: {
            nodes: [
              {
                id: "MDEwOlJlcG9zaXRvcnkxMjM0NTY3ODk=",
                name: "Repository For Testing",
                description: "test",
                url: "adamelamrani.com",
                stargazerCount: 1,
              },
            ],
          },
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
        username: "adam",
      },
    },
    error: new Error("Fetching data error"),
  },
];
