import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";

describe("Given an App component", () => {
  const headingText = "MVST - Code Challenge";
  const labelText = "Type a username to search for repositories!";
  const { container } = render(<App />);
  describe("When it is rendered", () => {
    it("It should contain a Label element and an H1 elemnt", () => {
      const label = container.querySelector("label");
      const headingOne = container.querySelector("h1");
      expect(label).toBeInTheDocument();
      expect(headingOne).toBeInTheDocument();
    });
    it("The text content of the paragraph should be 'Type a username to search for repositories!'", () => {
      const label = container.querySelector("label");
      expect(label).toHaveTextContent(labelText);
    });
    it("The text content of the heading one should be 'MVST - Code Challenge'", () => {
      const headingOne = container.querySelector("h1");
      expect(headingOne).toHaveTextContent(headingText);
    });
  });
});
