import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";

describe("Given an App component", () => {
  const textContent = "MVST - Work in Progress!";
  const { container } = render(<App />);
  describe("When it is rendered", () => {
    it("It should contain a Paragraph element", () => {
      const paragraph = container.querySelector("p");
      expect(paragraph).toBeInTheDocument();
    });
    it("The text content of the paragraph should be 'MVST - Work in Progress!'", () => {
      const paragraph = container.querySelector("p");
      expect(paragraph).toHaveTextContent(textContent);
    });
  });
});
