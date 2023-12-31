# MVST Coding challenge

### Description

The goal of this challenge is to create a simple webapp that allows the user to search for a GitHub user and see their repositories. To achieve that, it is required to use the GitHub API.
The project must be written using React and Typescript and the code must be versioned using git.

### Requirements

- The application must be written using React ✅
- Use typescript ✅
- You are required to use git for versioning ✅
- Feel free to use any additional plugin/module to help you get the task done more
  effectively
- Google Chrome is the testing browser ✅

### Extra credits

Things that are not mandatory, but we would like to see:

- +1 if you add storybook and divide the components
- Tests are done using Vitest and Jest DOM from Testing Library ✅
- Webapp is deployed to Netlify: <a href="https://mvst-adams-challenge.netlify.app/">Link here</a> ✅
- +1 If your [code is documented](https://google.github.io/styleguide/jsguide.html#jsdoc)
- +1 If you’re up for the challenge, use the [v4 API](https://docs.github.com/en/graphql), which is built using GraphQL. ✅
- +1 If you write a README that includes
  - A short description about the project ✅
  - Instructions on how to run it ✅
  - Instructions on how to run the test suite ✅
  - Future improvements

### How to run the project

- Clone the repo
- Run `yarn` to install dependencies
- Run `yarn dev` to start the development server
- Run `yarn test` to run the test suite
- Run `yarn build` to build the project

### Dependencies used

- `@apollo/client` - User to fetch data from the GitHub GraphQL API
- `@testing-library/jest-dom` - Used to test the DOM
- `@testing-library/react` - Used to test React components
- `vitest` - Used to run the test suite and generate coverage reports
- `react-toastify` - Used to show toast messages and provide information to the user
- `use-debounc` - Used to debounce the search input

### Future improvements

- Add more tests
  - Add tests to cover the pagination and filters by language and repo name and reach 100% coverage
- Add more filters
  - Add more filters to the search results, like the number of stars, forks, etc.
- Add load more button instead of previous / next, or pagination with query params page
  - Add a load more button to load more results instead of having to click on the next / previous buttons.
- Add storybook
  - Add storybook to the project to have a better overview of the components.
- Add more information to the repository card
  - Add colouring such as GitHub does to the repository card languages.
