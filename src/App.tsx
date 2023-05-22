import React, { useState } from 'react';
import Play from './Pages/Play';
import Editor from './Pages/Editor';
import Scoreboard from './Pages/Scoreboard';
import { LevelData } from './Interfaces/LevelData';
import { extractScore } from './Components/Functions';
import GameStart from './Pages/GameStart';

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

  return (
    <main>
      {
        page === "GameStart" ? <GameStart PageChanger={setPage} /> :
          page === "Play" ? <Play MetaData={level} PageChanger={setPage} /> :
            page === "Editor" ? <Editor /> :
              page === "Scoreboard" ? <Scoreboard LevelRanking={extractScore(level)} CurrentLevel={parseInt(level.level)} UpNext={parseInt(level.level) + 3} PageChanger={setPage} /> :
                null
      }
    </main>
  )
}