import FluidText from "../../atoms/FluidText";

function HeaderContent({
  title,
  searchComponent,
  leftComponent,
  rightComponent,
}) {
  return (
    <div className="flex items-center justify-between w-full h-full gap-6">
      {/* Left */}
      <div className="flex items-center gap-4 h-full">
        {leftComponent}
        {title && (
          <FluidText
            fontFamily="Gabriela"
            maxScale={1.3} 
            className="gabriela-regular !text-(--primary) text-2xl sm:text-3xl"
          >
            {title}
          </FluidText>
        )}
      </div>

      {/* Center + Right */}
      <div className="flex items-center gap-4 h-full">
        {/* Center (Search) */}
        <div className="flex justify-center items-center h-full">
          {searchComponent}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 h-full">
          {rightComponent}
        </div>
      </div>
    </div>
  );
}

export default HeaderContent;
