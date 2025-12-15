import HeaderProfile from "./HeaderProfile";

const AppHeader = ({ headerContent, setIsAuth }) => {
  return (
    <header className="w-full h-full px-6 flex items-center bg-(--accent-light)/60 rounded-2xl">
      <div className="flex items-center justify-between w-full gap-6">

        {/* PAGE HEADER CONTENT */}
        <div className="flex-1 flex items-center">
          {headerContent}
        </div>

        {/* PROFILE */}
        <HeaderProfile setIsAuth={setIsAuth} />
      </div>
    </header>
  );
};

export default AppHeader;
