import PropTypes from "prop-types";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

export const FormInput = ({ label, name, placeholder, type = "text", ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={clsx("input input-bordered", errors[name] && "input-error")}
        {...props}
        {...register(name)}
      />
      {errors[name] && (
        <label className="label">
          <span className="label-text-alt text-error">{errors[name]?.message}</span>
        </label>
      )}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  // Additional PropTypes can be added here for other input attributes if necessary
};

FormInput.defaultProps = {
  type: "text",
};
