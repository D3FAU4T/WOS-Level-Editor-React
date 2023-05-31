import React, { Suspense, useEffect, useState } from 'react';
import { LevelData, TopbarMode } from './Interfaces/LevelData';
import io from 'socket.io-client';

const socket = io('https://wos-level-editor.d3fau4tbot.repl.co', {
  transports: ["websocket"]
});

const level: LevelData = {
  "lang": "English",
  "fakeLetters": "",
  "hiddenLetters": "",
  "reveal": true,
  "level": "100",
  "timebar": {
    "timerPercentage": 100,
    "locks": {
      "total": 3,
      "expired": 0
    }
  },
  "column1": [
    { "word": "coned", "username": "chantell_nz", "locked": false, "index": 0 },
    { "word": "demon", "username": "draconis256_", "locked": false, "index": 1 },
    { "word": "denim", "username": "chantell_nz", "locked": false, "index": 2 },
    { "word": "medic", "username": "arch_a_tri", "locked": false, "index": 3 }
  ],
  "column2": [
    { "word": "mince", "username": "arch_a_tri", "locked": false, "index": 4 },
    { "word": "mined", "username": "d3fau4t", "locked": false, "index": 5 },
    { "word": "coined", "username": "arch_a_tri", "locked": false, "index": 6 },
    { "word": "income", "username": "chantell_nz", "locked": false, "index": 7 }
  ],
  "column3": [
    { "word": "minced", "username": "d3fau4t", "locked": false, "index": 8 },
    { "word": "demonic", "username": "draconis256_", "locked": false, "index": 9 }
  ]
}

export default function App() {
  // Imports
  const Play = React.lazy(() => import('./Pages/Play'));
  const Editor = React.lazy(() => import('./Pages/Editor'));
  const Scoreboard = React.lazy(() => import('./Pages/Scoreboard'));
  const GameStart = React.lazy(() => import('./Pages/GameStart'));


  const [page, setPage] = useState("GameStart");
  const [levelData, setLevelData] = useState<LevelData>(level);
  const [levelFinished, setLevelFinished] = useState<boolean>(false);
  const [scoreboardData, setScoreboardData] = useState<{
    Level: number;
    LevelRanking: { [username: string]: number };
    Streamer: string;
    TotalRanking: { [username: string]: number };
    UpNext: number;
  }>({
    Level: 1,
    LevelRanking: {},
    Streamer: "",
    TotalRanking: {},
    UpNext: 2,
  });

  const [topbarData, setTopbardata] = useState<{
    guesser: string;
    word: string;
    mode: TopbarMode;
  }>({
    guesser: "System",
    word: "WOS",
    mode: "No Hit",
  });


  function updateSlotContent(boardObj: LevelData, word: string) {
    const columns = [boardObj.column1, boardObj.column2, boardObj.column3];

    columns.forEach(column => {
      column.forEach(obj => {
        const slotElement = document.querySelector(`#OurSlot${obj.index}`);
        const nickElement = document.querySelector(`#OurSlot${obj.index} .nick`);
        const letters = obj.word.split('');

        if (letters.includes('?') || obj.word != word) return;
        slotElement!.classList.add('hit');
        slotElement!.classList.add('expired');
        nickElement!.textContent = obj.username;
        const letterElements = document.querySelectorAll(`#OurSlot${obj.index} .letter`);

        letters.forEach((letter, i) => {
          if (letterElements[i]) {
            letterElements[i].innerHTML = `<span>${letter}</span>`;
          }
        });
      });
    });
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected to server: ", socket.id);
    });

    socket.on('handshake', data => {
      console.log(data)
      socket.emit('handshake', 'Hello from client')
    });

    socket.on('newLevel', (data) => {
      setLevelFinished(false);
      const board = data
      if (board.fakeLetters === undefined) board.fakeLetters = "";
      setLevelData(board);
      setTopbardata({
        guesser: "System",
        word: "WOS",
        mode: "1 fake"
      })
    });

    socket.on('guess', (board, topbarData, scoreboardData) => {
      setLevelData(board);
      updateSlotContent(board, topbarData.word);
      setTopbardata(topbarData);
      setScoreboardData(scoreboardData);
    });

    socket.on('triggerScoreboard', () => {
      setLevelFinished(true);
    });

    return () => {
      socket.off('connect');
      socket.off('handshake');
      socket.off('newLevel');
      socket.off('guess');
      socket.off('triggerScoreboard');
    }
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main>
        {
          page === "GameStart" ? <GameStart PageChanger={setPage} Socket={socket} /> :
            page === "Play" ? <Play SetLevelFinished={setLevelFinished} SetLevelData={setLevelData} MetaData={levelData} PageChanger={setPage} TopBarData={topbarData} LevelFinished={levelFinished} /> :
              page === "Editor" ? <Editor /> :
                page === "Scoreboard" ? <Scoreboard SetLevelFinished={setLevelFinished} TotalRanking={Object.entries(scoreboardData.TotalRanking)
                  .sort((a, b) => b[1] - a[1])
                  .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})} LevelRanking={Object.entries(scoreboardData.LevelRanking)
                    .sort((a, b) => b[1] - a[1])
                    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})} CurrentLevel={scoreboardData.Level} UpNext={scoreboardData.UpNext} PageChanger={setPage} Socket={socket} /> :
                  null
        }
      </main>
    </Suspense>
  )
}