import { GET_REPOSITORIES } from "../../graphql/Repositories";

export const repositoryMockSuccess = [
  {
    request: {
      query: GET_REPOSITORIES,
      variables: {
        username: "adam",
        first: 10,
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
                stargazers: {
                  stargazerCount: 1,
                },
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
        first: 10,
      },
    },
    error: new Error("Fetching data error"),
  },
];
