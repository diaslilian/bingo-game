import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-[#5518C2] text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} [1bingo] - Fundação 1Bi</p>
        </div>
      </footer>
    </div>
  );
};
