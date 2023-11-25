import { describe, expect, it } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "../App";
import {
  repositoryMockSuccess,
  repositoryMockError,
  repositoryMockSuccessNoValue,
} from "../utils/mocks/repositoryMock";

describe("Given an App component rendered with mocked custom query", () => {
  describe("When the user types the username 'adam' in the input field ", () => {
    it("It should render with the ", async () => {
      const toastTextContent = "Data fetched successfully!";
      const mockRepositoryName = "Repository For Testing";
      const { container } = render(
        <MockedProvider mocks={repositoryMockSuccess} addTypename={false}>
          <App />
        </MockedProvider>
      );

      const input = container.querySelector("input");
      fireEvent.change(input as HTMLInputElement, {
        target: { value: "adam" },
      });
      expect(await screen.findByText(mockRepositoryName)).toBeInTheDocument();
      expect(await screen.findByText(toastTextContent)).toBeInTheDocument();
    });
    it("It should not have the text 'Type a username to search for repositories!'", async () => {
      const labelText = "Type a username to search for repositories!";
      expect(screen.queryByText(labelText)).not.toBeInTheDocument();
    });
    it("It should have the query params in the url", async () => {
      const query = new URLSearchParams(window.location.search);
      expect(query.get("query")).toBe("adam");
    });
  });

  describe("When the user types a username that doesn't exists", () => {
    it("It should render with the error message", async () => {
      const errorMessage = "Fetching data error";
      const { container } = render(
        <MockedProvider mocks={repositoryMockError} addTypename={false}>
          <App />
        </MockedProvider>
      );

      const input = container.querySelector("input");
      fireEvent.change(input as HTMLInputElement, {
        target: { value: "adam" },
      });
      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe("When the user removes the previous value from the input", () => {
    it("It should render with the text 'Type a username to search for repositories!'", async () => {
      const labelText = "Type a username to search for repositories!";
      const { container } = render(
        <MockedProvider mocks={repositoryMockSuccess} addTypename={false}>
          <App />
        </MockedProvider>
      );

      const input = container.querySelector("input");
      fireEvent.change(input as HTMLInputElement, {
        target: { value: "adam" },
      });
      fireEvent.change(input as HTMLInputElement, {
        target: { value: "" },
      });
      expect(await screen.findByText(labelText)).toBeInTheDocument();
    });
    it("After removing the value from the input, it should have the query params removed from the url", async () => {
      const query = new URLSearchParams(window.location.search);
      expect(query.get("query")).toBe(null);
    });
  });

  describe("When the user searches for a username that exists but doesn't have any repositories", () => {
    it("It should render with the text 'No repositories found'", async () => {
      const noRepositoriesText = "No repositories found";
      const { container } = render(
        <MockedProvider
          mocks={repositoryMockSuccessNoValue}
          addTypename={false}
        >
          <App />
        </MockedProvider>
      );

      const input = container.querySelector("input");
      fireEvent.change(input as HTMLInputElement, {
        target: { value: "adam" },
      });
      expect(await screen.findByText(noRepositoriesText)).toBeInTheDocument();
    });
  });
});
