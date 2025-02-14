import React from "react";

function Card({ className, children, ...props }) {
  return (
    <div
      className={`rounded-lg border bg-[$ffffff] text-[#0a0a0a] shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }) {
  return (
    <div
      className={`text-2xl leading-none font-semibold tracking-tight ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function CardDescription({ className, children, ...props }) {
  return (
    <div className={`text-sm text-[#737373] ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardContent({ className, children, ...props }) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...props }) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
