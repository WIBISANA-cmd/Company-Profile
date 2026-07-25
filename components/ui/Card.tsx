import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = "", hoverable = true }: CardProps) {
  return (
    <div
      className={`bg-surface rounded-2xl border border-line p-6 sm:p-8 transition-all duration-300 ${
        hoverable
          ? "hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-600/5 hover:border-brand-500/50"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
