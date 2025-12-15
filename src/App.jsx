import React from "react";
import AppNavigator from "@/config/AppNavigator";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <AppNavigator />
      </React.Suspense>

      {/* Global Toaster container */}
      <Toaster
        position="top-center"
        containerStyle={{
          top: "27px", 
        }}
        toastOptions={{
          duration: 1000,
          style: {
            background: "var(--accent-light)",
            color: "var(--primary)",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            fontFamily: "Gabriela, serif",
          },
        }}
      />
    </>
  );
};

export default App;
