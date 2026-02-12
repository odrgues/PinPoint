export function Button({
  children,
  onClick,
  variant = "ghost",
  className = "",
}) {
  const baseStyles =
    "p-2 rounded-md transition-all duration-200 flex items-center justify-center";

  const variants = {
    danger: "bg-red-50 text-red-500 hover:bg-red-100 border border-red-200",
    ghost:
      "text-brand-muted hover:text-brand-primary hover:bg-brand-background",
    primary: "bg-brand-primary text-white hover:bg-brand-secondary shadow-md",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
