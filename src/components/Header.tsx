import React from "react";
import BingoLogo from "../assets/1bingo-icon.png";
export const Header: React.FC = () => {
  return (
    <header className="bg-[#f6f7f9] shadow-md rounded-lg mb-8 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={BingoLogo} alt="1bingo Logo" className="w-24" />
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-gray-600">Bora de Bingo!</span>
          <div className="h-3 w-3 rounded-full bg-[#B020AB] animate-pulse"></div>
        </div>
      </div>
    </header>
  );
};
