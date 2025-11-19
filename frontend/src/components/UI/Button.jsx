import { clsx } from "clsx";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-lg font-semibold transition transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-accent text-white shadow-md hover:from-accent hover:to-primary",
    secondary:
      "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
    accent: "bg-purple-500 text-white hover:bg-purple-600",
  };
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
