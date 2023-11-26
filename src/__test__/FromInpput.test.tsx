import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FormInput from "../components/formInput/FormInput";
import { UserData } from "../components/repositoryItem/RepositoryInterface";

const data: UserData = {
  search: {
    nodes: [
      {
        id: "MDEwOlJlcG9zaXRvcnkxMjM0NTY3ODk=",
        name: "Repository For Testing",
        description: "test",
        url: "adamelamrani.com",
        languages: {
          nodes: [
            {
              name: "JavaScript",
              color: "#f1e05a",
              id: "MDg6TGFuZ3VhZ2UxMDM=",
            },
          ],
        },
        stargazers: {
          totalCount: 1,
        },
      },
    ],
    pageInfo: {
      endCursor: "Y3Vyc29yOnYyOpHOA3Z7ZQ==",
      startCursor: "Y3Vyc29yOnYyOpHOA3Z7ZQ==",
      hasPreviousPage: false,
      hasNextPage: false,
    },
  },
};

describe("Given an FormInput component", () => {
  const labelText1 = "Type a username to search for repositories!";
  const labelText2 = "Select a language:";
  const labelText3 = "Search by repo name:";
  describe("When it is rendered and the user doesn't type in any query", () => {
    render(
      <BrowserRouter>
        <FormInput data={data} query="" />
      </BrowserRouter>
    );
    it("It should contain a Label and an Input element", () => {
      const input = screen.getAllByRole("textbox");
      input.forEach((input) => {
        expect(input).toBeInTheDocument();
      });
      expect(input).toHaveLength(2);
    });
    it("The text content of the label should be 'Type a username to search for repositories!'", () => {
      expect(screen.getByText(labelText1)).toBeInTheDocument();
      expect(screen.getByText(labelText2)).toBeInTheDocument();
      expect(screen.getByText(labelText3)).toBeInTheDocument();
    });
  });
});
