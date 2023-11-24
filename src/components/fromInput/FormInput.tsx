import { FormInputProps } from "./FormInputTypes";
import FormCss from "./formInput.module.css";

const FormInput: React.FC<FormInputProps> = ({
  username,
  data,
  error,
  onChange,
}) => {
  return (
    <form className={FormCss.formStyle}>
      {!username && !data && !error && (
        <label className={FormCss.labelStyle} htmlFor="username-input">
          <strong>Type a username to search for repositories!</strong>
        </label>
      )}
      <input
        id="username-input"
        className={FormCss.inputStyle}
        type="text"
        onChange={({ target }) => onChange(target.value)}
        placeholder="username"
      />
    </form>
  );
};

export default FormInput;
