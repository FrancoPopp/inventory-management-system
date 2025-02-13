function Button({ children, ...props }) {
  return (
    <button
      className="ring-offset-background inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md font-medium transition-colors hover:bg-[#f4f4f5] hover:text-[#18181b] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
