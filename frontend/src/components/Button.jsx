function Button({ className, children, ...props }) {
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-evenly gap-2 rounded-md font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
