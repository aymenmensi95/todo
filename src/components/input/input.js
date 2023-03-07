import * as React from "react";

const Input = React.forwardRef(
  ({ className, value, onChange, type, ...props }, ref) => {
    const [viewPassword, setViewPassword] = React.useState(false);

    const isPassword = React.useMemo(() => type === "password", [type]);

    return (
      <div className={`input ${className || ""}`}>
        <input
          {...props}
          ref={ref}
          type={isPassword ? (viewPassword ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
        {isPassword && (
          <div
            className="password-btn btn sm"
            onClick={() => setViewPassword((prev) => !prev)}
          >
            {viewPassword ? "Hide" : "Show"}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
