import React, { useState } from 'react';
import './Cemu.css'; // Optional: for modular styling separation

export default function CemuApp({ isOpen, onClose, isFocused, onFocus }) {
  const [currentScreen, setCurrentScreen] = useState('menu'); // menu, loading, playing
  const [selectedGame, setSelectedGame] = useState(null);

  const gamesLibrary = [
    { id: 'botw', title: 'The Legend of Zelda: Breath of the Wild', banner: '🏹', region: 'USA (En)' },
    { id: 'mk8', title: 'Mario Kart 8', banner: '🏎️', region: 'USA (En)' },
    { id: 'sm3dw', title: 'Super Mario 3D World', banner: '🐱', region: 'USA (En)' }
  ];

  const launchGame = (game) => {
    setSelectedGame(game);
    setCurrentScreen('loading');
    setTimeout(() => {
      setCurrentScreen('playing');
    }, 2500); // Simulate shader compilation
  };

  const stopEmulation = () => {
    setCurrentScreen('menu');
    setSelectedGame(null);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`window cemu-window ${isFocused ? 'active' : ''}`}
      style={{ zIndex: isFocused ? 100 : 10 }}
      onClick={onFocus}
    >
      {/* Window Header */}
      <div className="window-header">
        <div className="window-controls">
          <button className="control-btn btn-close" onClick={onClose}></button>
          <button className="control-btn btn-minimize"></button>
          <button className="control-btn btn-maximize"></button>
        </div>
        <div className="window-title">
          Cemu v2.0-experimental (macOS, x64) – {selectedGame ? selectedGame.title : 'Game List'}
        </div>
      </div>

      {/* Emulator Content */}
      <div className="window-content cemu-content">
        
        {/* Top App Menu Bar */}
        <div className="cemu-app-bar">
          <button onClick={stopEmulation} disabled={currentScreen === 'menu'}>File</button>
          <button>Options</button>
          <button>Debug</button>
          <button>Tools</button>
          <button>Help</button>
        </div>

        {/* Dynamic Interface Screen */}
        {currentScreen === 'menu' && (
          <div className="cemu-game-list">
            <table>
              <thead>
                <tr>
                  <th>Game Name</th>
                  <th>Region</th>
                  <th>Version</th>
                  <th>App ID</th>
                </tr>
              </thead>
              <tbody>
                {gamesLibrary.map((game) => (
                  <tr key={game.id} onDoubleClick={() => launchGame(game)}>
                    <td><span className="game-icon">{game.banner}</span> {game.title}</td>
                    <td>{game.region}</td>
                    <td>v1.0.0</td>
                    <td>00050000-XXXXXXXX</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cemu-footer">
              Double-click a title to launch emulation.
            </div>
          </div>
        )}

        {currentScreen === 'loading' && (
          <div className="cemu-screen cemu-loading">
            <div className="spinner"></div>
            <h3>Compiling pipelines & shaders...</h3>
            <p>Loading {selectedGame?.title}</p>
          </div>
        )}

        {currentScreen === 'playing' && (
          <div className="cemu-screen cemu-gameplay">
            <div className="game-canvas">
              <h2>{selectedGame?.banner}</h2>
              <h1>{selectedGame?.title}</h1>
              <p className="fps-counter">60.00 FPS (Vulkan)</p>
            </div>
            <button className="cemu-exit-btn" onClick={stopEmulation}>
              Stop Emulation
            </button>
          </div>
        )}

      </div>
    </div>
  );
}