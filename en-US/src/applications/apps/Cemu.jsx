import React, { useState } from 'react';
import './Cemu.scss'; // Optional: for app-specific custom styling

export default function CemuApp() {
  const [games, setGames] = useState([
    { id: 1, title: 'The Legend of Zelda: Breath of the Wild', region: 'US', status: 'Ready' },
    { id: 2, title: 'Super Mario 3D World', region: 'US', status: 'Ready' },
    { id: 3, title: 'Mario Kart 8', region: 'US', status: 'Update Required' }
  ]);

  const [logs, setLogs] = useState([
    '[Info] Initialize Cemu 2.0-ext',
    '[Info] Graphic pack system initialized',
    '[Info] Vulkan backend: Found compatible device "Apple M-series GPU"'
  ]);

  const bootGame = (title) => {
    setLogs(prev => [...prev, `[Ready] Loading title: ${title}...`, `[Success] Emulation started successfully.`]);
  };

  return (
    <div className="cemu-container w-full h-full flex flex-col bg-[#1e1e1e] text-[#f5f5f7] font-sans select-none">
      {/* Cemu Toolbar */}
      <div className="cemu-toolbar flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3d3d3d] text-sm">
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-blue-400 font-medium">File</span>
          <span className="cursor-pointer hover:text-blue-400 font-medium">Options</span>
          <span className="cursor-pointer hover:text-blue-400 font-medium">Tools</span>
          <span className="cursor-pointer hover:text-blue-400 font-medium">Debug</span>
          <span className="cursor-pointer hover:text-blue-400 font-medium">Help</span>
        </div>
        <div className="flex items-center gap-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Cemu_Emulator_Official_Logo.png" 
            alt="Cemu Logo" 
            className="w-5 h-5 object-contain"
          />
          <span className="text-xs text-gray-400 font-semibold">Cemu (Wii U) - macOS</span>
        </div>
      </div>

      {/* Main Workspace split into Game List and Console Logs */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Game Library Section */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Game Library</h2>
          <div className="bg-[#252526] rounded-lg border border-[#333333] overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2d2d2d] text-gray-400 border-b border-[#333333]">
                  <th className="p-2.5 font-semibold">Game Title</th>
                  <th className="p-2.5 font-semibold w-20 text-center">Region</th>
                  <th className="p-2.5 font-semibold w-32 text-center">Status</th>
                  <th className="p-2.5 font-semibold w-24 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {games.map(game => (
                  <tr key={game.id} className="border-b border-[#2d2d2d] hover:bg-[#2a2a2b] transition-colors">
                    <td className="p-2.5 font-medium flex items-center gap-2">
                      <span className="text-blue-400">🎮</span> {game.title}
                    </td>
                    <td className="p-2.5 text-center text-gray-400">{game.region}</td>
                    <td className="p-2.5 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${game.status === 'Ready' ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-yellow-900/50 text-yellow-400 border border-yellow-800'}`}>
                        {game.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-center">
                      <button 
                        onClick={() => bootGame(game.title)}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-medium transition-all active:scale-95"
                      >
                        Play
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Console / Status Log Output */}
        <div className="h-32 bg-[#181818] border-t border-[#2d2d2d] p-3 font-mono text-[11px] text-gray-400 overflow-y-auto">
          <div className="text-gray-500 font-bold mb-1 border-b border-[#222] pb-1 uppercase tracking-wide text-[9px]">Console Log Output</div>
          {logs.map((log, idx) => (
            <div key={idx} className="py-0.5 whitespace-pre-wrap">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}