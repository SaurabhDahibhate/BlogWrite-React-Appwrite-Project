import React from "react";

function Container({ children }) {
  return (
    <nav className="pt-10 pb-16  dark:text-white dark:bg-slate-900 bg-gray-100">
      <div className="pt-16 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {children}
      </div>
    </nav>
  );
}

export default Container;
