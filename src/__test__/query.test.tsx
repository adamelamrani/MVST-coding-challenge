import { describe, expect, it } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "../App";
import {
  repositoryMockSuccess,
  repositoryMockError,
} from "../utils/mocks/repositoryMock";

describe("Given an App component rendered with mocked custom query", () => {
  describe("When the user types the in the input field 'adam'", () => {
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
  });

  describe("When the user types a repository that doesn't exists", () => {
    it("It should render with the error message", async () => {
      const toastTextContent = "Fetching data error";
      const { container } = render(
        <MockedProvider mocks={repositoryMockError} addTypename={false}>
          <App />
        </MockedProvider>
      );

      const input = container.querySelector("input");
      fireEvent.change(input as HTMLInputElement, {
        target: { value: "adam" },
      });
      expect(await screen.findByText(toastTextContent)).toBeInTheDocument();
    });
  });
});
