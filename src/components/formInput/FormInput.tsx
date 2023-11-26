import { useState, useEffect } from "react";
import { Language, Repository } from "../repositoryItem/RepositoryInterface";
import { FormInputProps } from "./FormInputTypes";
import styles from "./formInput.module.css";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

const FormInput: React.FC<FormInputProps> = ({ query, data, error }) => {
  const [formData, setFormData] = useState<{
    username: string;
    language: string;
    repoName: string;
  }>({
    username: "",
    language: "",
    repoName: "",
  });
  const [debouncedUsername] = useDebounce(formData.username, 500);
  const navigate = useNavigate();
  const { nodes: repos } = data?.search || [];

  const languagesInList = repos?.flatMap(
    (repo: Repository) =>
      repo.languages?.nodes?.map((node: Language) => node.name) || []
  );

  const languagesSet = new Set(languagesInList);

  //Shell, Bash and Dockerfile removed from the list
  //because Github API won't interpret them as main languages
  //and will return an empty list
  const languages = Array.from(languagesSet).filter(
    (language) =>
      language !== "Shell" && language !== "Bash" && language !== "Dockerfile"
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, language: event.target.value });
    navigate({ search: `?query=${query}&language=${event.target.value}` });
  };

  const clearFilters = () => {
    setFormData({ ...formData, language: "", repoName: "" });
    navigate({ search: `?query=${query}` });
  };

  useEffect(() => {
    setFormData({ ...formData, username: query });
  }, [query]);

  useEffect(() => {
    if (query && !debouncedUsername) {
      navigate({ search: `?query=${query}` });
      return;
    }
    if (debouncedUsername !== query) {
      navigate({ search: `?query=${debouncedUsername}` });
      return;
    }
    if (debouncedUsername === "" && query !== "") {
      navigate({ search: "" });
    }
  }, [debouncedUsername]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate({
      search: `?query=${formData.username}&repo=${formData.repoName}`,
    });
  };

  return (
    <>
      <form className={styles.formStyle} onSubmit={handleFormSubmit}>
        {!formData && !data && !error && (
          <label className={styles.labelStyle} htmlFor="userdata-input">
            <strong>Type a formData to search for repositories!</strong>
          </label>
        )}
        <input
          id="userdata-input"
          className={styles.inputStyle}
          type="text"
          onChange={({ target }) =>
            setFormData({ ...formData, username: target.value })
          }
          value={formData.username || ""}
          placeholder="Username"
        />
        {data && (
          <div className={styles.formBlock}>
            <div className={styles.selectBlock}>
              <label className={styles.labelStyle} htmlFor="select">
                Select a language:
              </label>
              <select
                className={styles.formSelect}
                id="select"
                value={formData.language}
                onChange={handleSelectChange}
              >
                <option>Select one or more</option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            <label className={styles.labelStyle} htmlFor="repoName">
              Search by repo name:
            </label>
            <input
              name="repoName"
              id="repoName"
              className={styles.inputStyle}
              type="text"
              placeholder="Search by repo name"
              value={formData.repoName}
              onChange={(e) =>
                setFormData({ ...formData, repoName: e.target.value })
              }
            />
            <div className={styles.buttonsBlock}>
              {" "}
              <button className={styles.buttonStyle} type="submit">
                Search
              </button>
              <button className={styles.buttonStyle} onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default FormInput;
