import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import RepositoriesList from "../components/repositoriesList/RepositoriesList";
import { mockedData } from "../utils/mocks/repositoryMock";
import ListStyles from "../components/repositoriesList/repositoriesList.module.css";
import ListItemStyles from "../components/repositoryItem/repositoryItem.module.css";

describe("Given a RepositoriesList component", () => {
  render(<RepositoriesList repositories={mockedData.search.nodes} />);

  describe("When it is rendered", () => {
    it("Then it should render a ul element", () => {
      const ul = screen.getAllByRole("list");
      expect(ul).toHaveLength(2);
      expect(ul[0]).toHaveClass(ListStyles.listStyle);
      expect(ul[1]).toHaveClass(ListItemStyles.languagesList);
    });
  });

  it("Then it should render a list item that contains a heading and another list", () => {
    const listItems = screen.getAllByRole("listitem");
    const heading = screen.getByRole("heading");
    const ul = screen.getAllByRole("list");

    expect(listItems).toHaveLength(2);
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(mockedData.search.nodes[0].name);

    expect(ul[1]).toHaveClass(ListItemStyles.languagesList);
  });

  describe("For each element in the mockedData", () => {
    it("Then it should render a list item with the name of the repository", () => {
      const listItems = screen.getAllByRole("listitem");

      expect(listItems[0]).toHaveTextContent(mockedData.search.nodes[0].name);
    });
  });
});
