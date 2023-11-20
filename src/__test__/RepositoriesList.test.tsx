import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import RepositoriesList from "../components/repositoriesList/RepositoriesList";
import ListStyle from "../components/repositoriesList/repositoriesList.module.css";

describe("Given a RepositoriesList component", () => {
  const { container } = render(
    <RepositoriesList>{<li>item 1</li>}</RepositoriesList>
  );

  describe("When it is rendered", () => {
    it("Then it should render a ul element", () => {
      const ul = container.querySelector("ul");
      expect(ul).toBeInTheDocument();
    });
  });

  it("Then it should render a list of items", () => {
    const { getByText } = render(
      <RepositoriesList>
        <li>List Item 1</li>
        <li>List Item 2</li>
      </RepositoriesList>
    );
    expect(getByText("List Item 1")).toBeInTheDocument();
    expect(getByText("List Item 2")).toBeInTheDocument();
  });

  it("Then it should have listStyle class", () => {
    const ul = container.querySelector("ul");
    expect(ul).toHaveClass(ListStyle.listStyle);
  });
});
