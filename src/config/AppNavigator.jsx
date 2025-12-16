import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "./Routes";
import AppHeader from "@/components/templates/AppHeader";
import AppSidebar from "@/components/templates/AppSidebar";
import Container3D from "@/components/atoms/Container3D";

const AppNavigator = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("isLoggedIn"));
  const [searchValue, setSearchValue] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full fixed bg-(--background) overflow-hidden">
      <Routes>
        {routes.map(({ id, path, component, protectedRoute, hideSidebar }) => {
          const pageElement = React.isValidElement(component)
            ? React.cloneElement(component, { searchValue })
            : component;

          // LOGIN
          if (path === "/login") {
            return (
              <Route
                key={id}
                path={path}
                element={
                  isAuth ? (
                    <Navigate to="/" replace />
                  ) : (
                    React.cloneElement(component, { setIsAuth })
                  )
                }
              />
            );
          }

          // PROTECTED
          if (protectedRoute && !isAuth) {
            return (
              <Route
                key={id}
                path={path}
                element={<Navigate to="/login" replace />}
              />
            );
          }

          // AUTHENTICATED LAYOUT
          return (
            <Route
              key={id}
              path={path}
              element={
                <div className="flex h-screen w-full overflow-hidden relative">
                  {/* Sidebar */}
                  {!hideSidebar && (
                    <>
                      {/* Desktop sidebar */}
                      <div className="hidden lg:block fixed top-4 left-4 z-50">
                        <Container3D width={280} height="calc(100vh - 32px)">
                          <AppSidebar setIsAuth={setIsAuth} />
                        </Container3D>
                      </div>

                      {/* Mobile sidebar overlay */}
                      {mobileSidebarOpen && (
                        <div
                          className="fixed inset-0 z-[1099] bg-black/40 lg:hidden"
                          onClick={() => setMobileSidebarOpen(false)}
                        />
                      )}

                      {/* Mobile sidebar */}
                      <div
                        className={`fixed top-0 left-0 z-[1100] h-full w-[280px] lg:hidden transform transition-transform duration-300 ${
                          mobileSidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                        }`}
                      >
                        <AppSidebar
                          setIsAuth={setIsAuth}
                          onClose={() => setMobileSidebarOpen(false)}
                        />
                      </div>
                    </>
                  )}

                  {/* Main content */}
                  {/* Main content */}
                  <div
                    className={`flex-1 flex flex-col gap-4 transition-all duration-300 m-4 ${
                      hideSidebar
                        ? "ml-0 w-full px-4 lg:px-0 "
                        : "lg:ml-[315px] ml-0 w-full px-4 lg:px-0"
                    }`}
                  >
                    {/* Header with hamburger */}
                    <Container3D
                      width="100%"
                      height={80}
                      className="relative z-[1000]"
                    >
                      <AppHeader
                        setIsAuth={setIsAuth}
                        headerContent={
                          component?.type?.header
                            ? component.type.header({
                                searchValue,
                                setSearchValue,
                              })
                            : null
                        }
                        toggleMobileSidebar={() =>
                          setMobileSidebarOpen((prev) => !prev)
                        }
                      />
                    </Container3D>

                    {/* Page content */}
                    {/* Page content */}
                    <div
                      className="overflow-y-auto rounded-2xl "
                      style={{
                        height:
                          window.innerWidth < 1024
                            ? "calc(100vh - 21vh)"
                            : "100%",
                      }}
                    >
                      <Container3D width="100%" height="100%" className="bg-(--accent-light)/60">
                        {pageElement}
                      </Container3D>
                    </div>
                  </div>
                </div>
              }
            />
          );
        })}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default AppNavigator;
