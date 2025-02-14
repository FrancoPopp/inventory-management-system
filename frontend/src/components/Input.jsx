function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-[#e5e5e5] bg-[#ffffff] px-3 py-2 text-base ring-offset-[#ffffff] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#0a0a0a] placeholder:text-[#737373] focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
      {...props}
    />
  );
}

export { Input };
