function Select({ className, children, ...props }) {
  return (
    <select
      className={`flex h-10 w-full items-center justify-between rounded-md border border-[#e5e5e5] bg-[#ffffff] px-3 py-2 text-sm ring-offset-[#ffffff] placeholder:text-[#737373] focus:ring-2 focus:ring-[#0a0a0a] focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

function SelectItem({ className, ...props }) {
  return <option className={`text-sm ${className}`} {...props} />;
}

export { Select, SelectItem };
