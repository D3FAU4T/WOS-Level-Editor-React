import React, { useState } from 'react';
import Play from './Pages/Play';
import Editor from './Pages/Editor';
import Scoreboard from './Pages/Scoreboard';

export default function App() {
  const [page, setPage] = useState("Play");

  return (
    <main>
      {
        page === "Play" ? <Play PageChanger={setPage} /> :
        page === "Editor" ? <Editor /> :
        page === "Scoreboard" ? <Scoreboard PageChanger={setPage} /> : null
      }      
    </main>
  )
}