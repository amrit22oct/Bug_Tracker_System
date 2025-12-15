import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "./Routes";
import AppHeader from "@/components/templates/AppHeader";
import AppSidebar from "@/components/templates/AppSidebar";
import Container3D from "@/components/atoms/Container3D";

const AppNavigator = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("isLoggedIn"));

  // Search state for header
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="h-screen w-full fixed bg-(--background) overflow-hidden">
      <Routes>
        {routes.map(({ id, path, component, protectedRoute }) => {
          if (!isAuth && path === "/login") {
            return (
              <Route
                key={id}
                path={path}
                element={React.cloneElement(component, { setIsAuth })}
              />
            );
          }

          if (isAuth) {
            return (
              <Route
                key={id}
                path={path}
                element={
                  <div className="flex h-screen w-full overflow-hidden">
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

                    {/* Main layout */}
                    <div className="flex-1 flex flex-col ml-[315px] m-4 gap-4 max-h-screen">
                      {/* Header */}
                      <Container3D
                        width="100%"
                        height={80}
                        className="shadow-lg flex-shrink-0 relative z-10"
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

                      {/* Scrollable content */}
                      <div className="flex-1 overflow-y-auto overflow-x-hidden rounded-2xl">
                        <Container3D
                          width="100%"
                          height="100%"
                          className="flex justify-center items-center rounded-2xl"
                        >
                          {component}
                        </Container3D>
                      </div>
                    </div>
                  </div>
                }
              />
            );
          }

          return <Route key={id} path={path} element={component} />;
        })}
      </Routes>
    </div>
  );
};


export default AppNavigator;
