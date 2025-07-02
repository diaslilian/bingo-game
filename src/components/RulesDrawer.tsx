import React from "react";
import { useGame } from "../context/GameContext";
import { X, CheckCircle } from "lucide-react";

export const RulesDrawer: React.FC = () => {
  const { toggleRules } = useGame();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={toggleRules}
      ></div>

      <div className="drawer w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#5518C2]">
              Regras do [1bingo]
            </h2>
            <button
              onClick={toggleRules}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="rules-card">
              <h3 className="text-lg font-semibold text-[#B020AB] mb-2">
                Como Jogar
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>
                  Cada jogador recebe uma cartela do bingo com 25 espaços.
                </li>
                <li>O espaço central é sempre marcado como [1bi].</li>
                <li>Um sorteador puxa números aleatoriamente de 1 a 75.</li>
                <li>Se um número sorteado aparecer no seu cartão, marque-o.</li>
                <li>
                  O primeiro jogador a completar um padrão de vitória grita
                  "BINGO!"
                </li>
              </ol>
            </div>

            <div className="rules-card">
              <h3 className="text-lg font-semibold text-[#B020AB] mb-2">
                Padrões de Vitória
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle
                    size={18}
                    className="text-green-500 mr-2 mt-0.5"
                  />
                  <span>
                    <strong>Linha:</strong> Complete qualquer linha horizontal
                    de 5 números.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    size={18}
                    className="text-green-500 mr-2 mt-0.5"
                  />
                  <span>
                    <strong>Coluna:</strong> Complete qualquer linha vertical de
                    5 números.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    size={18}
                    className="text-green-500 mr-2 mt-0.5"
                  />
                  <span>
                    <strong>Cartela cheia:</strong> Complete todos os números.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rules-card">
              <h3 className="text-lg font-semibold text-[#B020AB] mb-2">
                Layout do Cartão de Bingo
              </h3>
              <p className="text-gray-700 mb-2">
                Cada coluna corresponde a uma letra:
              </p>
              <ul className="space-y-1 text-gray-700">
                <li>
                  <strong>B:</strong> Números 1-15
                </li>
                <li>
                  <strong>I:</strong> Números 16-30
                </li>
                <li>
                  <strong>N:</strong> Números 31-45 (com [1bi] no centro)
                </li>
                <li>
                  <strong>G:</strong> Números 46-60
                </li>
                <li>
                  <strong>O:</strong> Números 61-75
                </li>
              </ul>
            </div>

            <div className="rules-card">
              <h3 className="text-lg font-semibold text-[#B020AB] mb-2">
                Regras Personalizadas
              </h3>
              <span className="text-gray-700 text-center font-extrabold block mb-4">
                ***FLAVIO ESTA PROIBIDO DE JOGAR!!***
              </span>

              <p className="text-gray-700 mb-4">
                Não é permitido vitória por diagonal ou linha/coluna do centro
                nas rodadas 1 e 2.
              </p>

              <p className="text-gray-700 text-lg mb-2">Definições:</p>
              <p className="text-gray-700 mb-2">
                O jogo é dividido em 3 rodadas:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>
                  <strong>Rodada 1:</strong> Linha ou coluna (sem centro)
                </li>
                <li>
                  <strong>Rodada 2:</strong> Linha ou coluna (sem centro)
                </li>
                <li>
                  <strong>Rodada 3:</strong> Cartela cheia
                </li>
              </ul>

              <p className="text-gray-700 mb-2">Prêmios por rodada:</p>

              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>
                  <strong>Meio day off</strong> (meio dia de folga)
                </li>
                <li>
                  <strong>Voucher</strong> (vale de desconto)
                </li>
                <li>
                  <strong>Day off</strong> (dia de folga completo)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
