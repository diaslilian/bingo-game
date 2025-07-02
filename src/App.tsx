import { Layout } from "./components/Layout";
import { GameProvider } from "./context/GameContext";
import { GameBoard } from "./components/GameBoard";
import { Header } from "./components/Header";
import { PlayerCard } from "./components/PlayerCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Layout>
          <Header />
          <Routes>
            <Route path="/" element={<GameBoard />} />
            <Route path="/card/:cardId" element={<PlayerCard />} />
          </Routes>
        </Layout>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
