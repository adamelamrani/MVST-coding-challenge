import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";

describe("Given an App component", () => {
  const headingText = "MVST - Code Challenge";
  const labelText = "Type a username to search for repositories!";
  render(
    <MockedProvider mocks={[]}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MockedProvider>
  );
  describe("When it is rendered", () => {
    it.only("It should contain a Label element and an H1 elemnt", () => {
      const headingOne = screen.getByRole("heading");
      const label = screen.getByRole("textbox");
      expect(headingOne).toBeInTheDocument();
      expect(label).toBeInTheDocument;
    });
    it("The text content of the label should be 'Type a username to search for repositories!'", () => {
      const label = screen.getByTestId("label-text");
      expect(label).toHaveTextContent(labelText);
    });
    it("The text content of the heading one should be 'MVST - Code Challenge'", () => {
      const headingOne = screen.getByRole("heading");
      expect(headingOne).toHaveTextContent(headingText);
    });
  });
});
