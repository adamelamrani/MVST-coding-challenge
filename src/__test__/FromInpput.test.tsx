import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

describe("Given an FormInput component", () => {
  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    cache: new InMemoryCache(),
  });
  const labelText = "Type a username to search for repositories!";
  const { container } = render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  describe("When it is rendered", () => {
    it("It should contain a Label and an Input element", () => {
      const label = container.querySelector("label");
      const input = container.querySelector("input");
      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });
    it("The text content of the label should be 'Type a username to search for repositories!'", () => {
      const label = container.querySelector("label");
      expect(label).toHaveTextContent(labelText);
    });
  });
});
