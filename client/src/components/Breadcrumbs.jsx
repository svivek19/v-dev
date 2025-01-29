import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Custom mapping for route names
  const getRouteName = (name) => {
    const routeMap = {
      ask: "Ask Question",
    };
    return routeMap[name] || name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <nav className="flex py-2 px-4 text-sm">
      <Link to="/" className="text-blue-600 hover:text-blue-800">
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={name}>
            <span className="mx-2 text-gray-500">/</span>
            {isLast ? (
              <span className="text-gray-600">{getRouteName(name)}</span>
            ) : (
              <Link to={routeTo} className="text-blue-600 hover:text-blue-800">
                {getRouteName(name)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
