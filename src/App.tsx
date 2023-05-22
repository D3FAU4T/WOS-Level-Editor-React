import React, { useEffect, useState } from 'react';
import Play from './Pages/Play';
import Editor from './Pages/Editor';
import Scoreboard from './Pages/Scoreboard';
import { LevelData } from './Interfaces/LevelData';
import { extractScore } from './Components/Functions';
import GameStart from './Pages/GameStart';
import { io } from 'socket.io-client';

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
  const [page, setPage] = useState("GameStart");
  const [levelData, setLevelData] = useState<LevelData>(level);
  const [topbardata, setTopbardata] = useState<{
    guesser: string,
    word: string,
    mode: "Hit" | "No Hit" | "Completed" | "1 fake" | "1 fake & 1 hidden" | "2 fakes & 1 hidden" | "2 fakes & 2 hidden" | "2 fakes & 3 hidden" | "hidden"
  }>({
    guesser: "System",
    word: "WOS",
    mode: 'No Hit'
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log('Socket connected: ', socket.id)
    });

    socket.on('handshake', data => {
      console.log(data)
      socket.emit('handshake', 'Hello from client')
    });

    socket.on('newLevel', (data) => {
      setLevelData(data);
    });

    socket.on('guess', (board, topbarData, scoreboardData) => {
      setLevelData(board);
      setTopbardata(topbarData);
      console.log(scoreboardData)
    });

    socket.on('triggerScoreboard', () => {
      console.log('Level end triggered')
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
    <main>
      {
        page === "GameStart" ? <GameStart PageChanger={setPage} Socket={socket} /> :
          page === "Play" ? <Play MetaData={levelData} setMetaData={setLevelData} PageChanger={setPage} TopbarData={topbardata} /> :
            page === "Editor" ? <Editor /> :
              page === "Scoreboard" ? <Scoreboard LevelRanking={extractScore(level)} CurrentLevel={parseInt(level.level)} UpNext={parseInt(level.level) + 3} PageChanger={setPage} /> :
                null
      }
    </main>
  )
}