import { useState } from "react";
import { Language, Repository } from "../repositoryItem/RepositoryInterface";
import { FormInputProps } from "./FormInputTypes";
import styles from "./formInput.module.css";

const FormInput: React.FC<FormInputProps> = ({
  username,
  data,
  error,
  onChange,
}) => {
  const { nodes: repos } = data?.user?.repositories || [];

  const languagesInList = repos?.flatMap(
    (repo: Repository) =>
      repo.languages?.nodes?.map((node: Language) => node.name) || []
  );

  const languagesSet = new Set(languagesInList);
  const languages = Array.from(languagesSet);

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <form className={styles.formStyle}>
        {!username && !data && !error && (
          <label className={styles.labelStyle} htmlFor="username-input">
            <strong>Type a username to search for repositories!</strong>
          </label>
        )}
        <input
          id="username-input"
          className={styles.inputStyle}
          type="text"
          onChange={({ target }) => onChange(target.value)}
          placeholder="username"
        />
        <label htmlFor="multiSelect">Select a language:</label>
        <select
          id="form-select"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option>Select one or more</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </form>
    </>
  );
};

export default FormInput;
