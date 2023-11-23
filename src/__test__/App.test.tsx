import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

describe("Given an App component", () => {
  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    cache: new InMemoryCache(),
  });
  const headingText = "MVST - Code Challenge";
  const paragraphText = "Type a username to search for repositories!";
  const { container } = render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  describe("When it is rendered", () => {
    it("It should contain a Paragraph element and an H1 elemnt", () => {
      const paragraph = container.querySelector("p");
      const headingOne = container.querySelector("h1");
      expect(paragraph).toBeInTheDocument();
      expect(headingOne).toBeInTheDocument();
    });
    it("The text content of the paragraph should be 'Type a username to search for repositories!'", () => {
      const paragraph = container.querySelector("p");
      expect(paragraph).toHaveTextContent(paragraphText);
    });
    it("The text content of the heading one should be 'MVST - Code Challenge'", () => {
      const headingOne = container.querySelector("h1");
      expect(headingOne).toHaveTextContent(headingText);
    });
  });
});
