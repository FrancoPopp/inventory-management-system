function Table({ className, children }) {
  return (
    <div className="relative w-full overflow-auto rounded-md">
      <table
        className={`w-full table-fixed caption-bottom text-sm ${className}`}
      >
        {children}
      </table>
    </div>
  );
}

function TableHeader({ className, children }) {
  return <thead className={`bg-indigo-300 ${className}`}>{children}</thead>;
}

function TableBody({ className, children }) {
  return <tbody className={className}>{children}</tbody>;
}

function TableFooter({ className, children }) {
  return (
    <tfoot className={`bg-[#f5f5f5] font-medium${className}`}>{children}</tfoot>
  );
}

function TableRow({ className, children }) {
  return (
    <tr className={`transition-colors even:bg-[#eaeaea] ${className}`}>
      {children}
    </tr>
  );
}

function TableHead({ className, children }) {
  return (
    <th
      className={`h-12 px-4 text-center align-middle font-bold [&:has([role=checkbox])]:pr-0 ${className}`}
    >
      {children}
    </th>
  );
}

function TableCell({ className, children }) {
  return (
    <td
      className={`p-4 text-center align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
    >
      {children}
    </td>
  );
}

function TableCaption({ className, children }) {
  return (
    <caption className={`mt-4 text-sm text-[#737373] ${className}`}>
      {children}
    </caption>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
