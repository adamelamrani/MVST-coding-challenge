import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import RepositoryItem from "../components/repositoryItem/RepositoryItem";
import RepositoryStyle from "../components/repositoryItem/repositoryItem.module.css";
import { Repository } from "../components/repositoryItem/RepositoryInterface";

// MOCK UP DATA
const repository: Repository = {
  id: "1",
  name: "test",
  description: "test",
  languages: {
    nodes: [
      {
        name: "test",
        color: "#fff",
        id: "1",
      },
    ],
  },
  url: "test",
  stargazers: {
    totalCount: 1,
  },
};

describe("Given a RepositoryItem component", () => {
  const { container } = render(<RepositoryItem repository={repository} />);
  describe("When it is rendered", () => {
    it("Then it should render a li element", () => {
      const li = container.querySelector("li");
      expect(li).toBeInTheDocument();
    });
    it("Then it should have a repository-item class", () => {
      const li = container.querySelector("li");
      expect(li).toHaveClass(RepositoryStyle.repositoryItem);
    });
    it("Then it should have an h3 element with the repository name", () => {
      const headingThree = container.querySelector("h3");
      expect(headingThree).toHaveTextContent(repository.name);
    });
    it("Then it should have a p element with the repository description", () => {
      const p = container.querySelector("p");
      expect(p).toHaveTextContent(repository.description);
    });
    it("Then it should have an a element with the repository url", () => {
      const a = container.querySelector("a");
      expect(a).toHaveAttribute("href", repository.url);
    });
  });

  describe("When it is rendered without a description", () => {
    it("Then it should render with the default text 'No description provided'", () => {
      const { container } = render(
        <RepositoryItem repository={{ ...repository, description: "" }} />
      );
      const p = container.querySelector("p");
      const defaultText = "No description provided";
      expect(p).toBeInTheDocument();
      expect(p?.textContent).toBe(defaultText);
    });
  });
});
