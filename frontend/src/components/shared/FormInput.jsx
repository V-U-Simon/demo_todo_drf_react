import PropTypes from "prop-types";
import clsx from "clsx";

export function FormInput({ label, placeholder, type, name, value, onChange, onInput, className, error }) {
  return (
    <div className={clsx("form-control", className)}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onInput={onInput}
        required
        className={clsx("input input-bordered w-full")}
      />
      {error && (
        <div className="label">
          <span className="label-text-alt text-error">{error}</span>
        </div>
      )}
    </div>
  );
}

FormInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf([
    "email",
    "text",
    "password",
    "number",
    "tel",
    "url",
    "search",
    "date",
    "datetime-local",
    "month",
    "week",
    "time",
    "range",
    "color",
  ]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onInput: PropTypes.func,
  className: PropTypes.string,
};

FormInput.defaultProps = {
  type: "text",
  className: "",
  placeholder: "",
  onInput: undefined,
};
