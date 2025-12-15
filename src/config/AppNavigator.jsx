import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./Routes";

import AppHeader from "@/components/templates/AppHeader";
import AppSidebar from "@/components/templates/AppSidebar";
import Container3D from "@/components/atoms/Container3D";

const ProtectedRoute = ({ isAuth, children }) => {
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
};

const AppLayout = ({ component, setIsAuth, searchValue, setSearchValue }) => {
  return (
    <div className="flex min-h-screen w-full bg-[var(--background)] overflow-hidden">
      {/* Sidebar */}
      <div className="fixed top-4 left-4 z-50">
        <Container3D
          width={280}
          height="calc(100vh - 32px)"
          className="flex flex-col shadow-xl"
        >
          <AppSidebar setIsAuth={setIsAuth} />
        </Container3D>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-[315px] m-4 gap-4 max-h-screen">
        {/* Header */}
        <Container3D
          width="100%"
          height={80}
          className="shadow-lg flex-shrink-0"
        >
          <AppHeader
            setIsAuth={setIsAuth}
            headerContent={
              component.type.header
                ? component.type.header({ searchValue, setSearchValue })
                : null
            }
          />
        </Container3D>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto rounded-2xl">
          <Container3D
            width="100%"
            height="100%"
            className="rounded-2xl p-2"
          >
            {component}
          </Container3D>
        </div>
      </div>
    </div>
  );
};

const AppNavigator = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("isLoggedIn"));
  }, []);

  return (
    <Routes>
      {routes.map(({ id, path, component, protectedRoute }) => {
        // Login route
        if (path === "/login") {
          return (
            <Route
              key={id}
              path={path}
              element={React.cloneElement(component, { setIsAuth })}
            />
          );
        }

        // Protected routes
        if (protectedRoute) {
          return (
            <Route
              key={id}
              path={path}
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <AppLayout
                    component={component}
                    setIsAuth={setIsAuth}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />
                </ProtectedRoute>
              }
            />
          );
        }

        // Public routes
        return <Route key={id} path={path} element={component} />;
      })}
    </Routes>
  );
};

export default AppNavigator;
