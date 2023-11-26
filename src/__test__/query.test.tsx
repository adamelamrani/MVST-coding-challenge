import { describe, expect, it } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "../App";
import {
  repositoryMockError,
  repositoryMockSuccess,
  repositoryMockSuccessNoValue,
} from "../utils/mocks/repositoryMock";
import { BrowserRouter } from "react-router-dom";

describe("Given an App component rendered with mocked custom query", () => {
  describe("When the user types the username 'adam' in the input field ", () => {
    it("It should render with the repository ", async () => {
      const mockRepositoryName = "Repository For Testing";

      render(
        <MockedProvider mocks={repositoryMockSuccess} addTypename={false}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MockedProvider>
      );

      const input = screen.getAllByRole("textbox");
      fireEvent.change(input[0], {
        target: { value: "adam" },
      });
      expect(await screen.findByText(mockRepositoryName)).toBeInTheDocument();
    });
    it("It should have the query params in the url", async () => {
      const query = new URLSearchParams(window.location.search);
      expect(query.get("query")).toBe("adam");
    });
  });
  describe("When the user types a username that doesn't exists", () => {
    it("It should render with the error message", async () => {
      const errorMessage = "Fetching data error";
      render(
        <MockedProvider mocks={repositoryMockError} addTypename={false}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MockedProvider>
      );

      const input = screen.getAllByRole("textbox");
      fireEvent.change(input[0], {
        target: { value: "adam" },
      });
      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe("When the user searches for a username that exists but doesn't have any repositories", () => {
    it("It should render with the text 'No repositories found'", async () => {
      const noRepositoriesText = "No repositories found";
      render(
        <MockedProvider
          mocks={repositoryMockSuccessNoValue}
          addTypename={false}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MockedProvider>
      );

      const input = screen.getAllByRole("textbox");
      fireEvent.change(input[0], {
        target: { value: "adam" },
      });
      expect(await screen.findByText(noRepositoriesText)).toBeInTheDocument();
    });
  });
});
