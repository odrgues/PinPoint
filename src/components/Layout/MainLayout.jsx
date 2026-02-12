import React from "react";

export function MainLayout({ sidebarSlot, mapSlot }) {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-white">
      <div className="w-full md:w-1/3 lg:w-1/4 h-1/3 md:h-full z-20 shadow-xl relative">
        {sidebarSlot}
      </div>

      <div className="flex-1 h-2/3 md:h-full relative z-0">{mapSlot}</div>
    </div>
  );
}
