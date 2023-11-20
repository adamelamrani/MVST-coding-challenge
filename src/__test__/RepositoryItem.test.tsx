import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import RepositoryItem from "../components/repositoryItem/RepositoryItem";
import RepositoryStyle from "../components/repositoryItem/repositoryItem.module.css";

describe("Given a RepositoryItem component", () => {
  const repository = {
    id: "1",
    name: "React Repository",
    description: "A JavaScript library for building user interfaces.",
    html_url: "https://github.com/facebook/react",
  };
  const { container } = render(<RepositoryItem repository={repository} />);
  describe("When it is rendered", () => {
    it("Then it should render a li element", () => {
      const li = container.querySelector("li");
      expect(li).toBeInTheDocument();
    });
  });
  it("Then it should have a repository-item class", () => {
    const li = container.querySelector("li");
    expect(li).toHaveClass(RepositoryStyle.repositoryItem);
  });
  it("Then it should have a strong element with the repository name", () => {
    const strong = container.querySelector("strong");
    expect(strong).toHaveTextContent(repository.name);
  });
  it("Then it should have a p element with the repository description", () => {
    const p = container.querySelector("p");
    expect(p).toHaveTextContent(repository.description);
  });
  it("Then it should have an a element with the repository url", () => {
    const a = container.querySelector("a");
    expect(a).toHaveAttribute("href", repository.html_url);
  });
});
