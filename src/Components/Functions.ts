import { LevelData } from "../Interfaces/LevelData";

export const shuffler = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const wordPoint = (input: string) => {
    const pointMap: { [letter: string]: number } = { "a": 1, "b": 3, "c": 3, "d": 2, "e": 1, "f": 4, "g": 2, "h": 4, "i": 1, "j": 8, "k": 5, "l": 1, "m": 3, "n": 1, "o": 1, "p": 3, "q": 10, "r": 1, "s": 1, "t": 1, "u": 1, "v": 4, "w": 4, "x": 8, "y": 4, "z": 10 }
    const word = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\?/g, '').toLowerCase().split('');
    let count = 0;
    word.forEach(letter => count += pointMap[letter] || 0)
    return count;
}

export const normalizeLetter = (letter: string) => letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const getTotalWordsOfTheLevel = (level: LevelData) => {
    return level.column1
        .concat(level.column2, level.column3)
        .flatMap(slot => slot.word)
        .length - 1;
}

export const getWordsOfTheLevel = (level: LevelData) => {
    return level.column1
        .concat(level.column2, level.column3)
        .flatMap(slot => slot.word)
        .join(' ');
}

export const createJSON = (
    words: string[],
    username = 'd3fau4tbot',
    locked = false,
    reveal = true,
    language: "English" | "Português" | "Français" = "English",
    level = 1,
    timerPercentage = 100,
    totalLocks = 3,
    expiredLocks = 0
    ) => {

    const board: LevelData = {
        lang: language,
        fakeLetters: "",
        hiddenLetters: "",
        reveal,
        level: level.toString(),
        timebar: {
            timerPercentage,
            locks: {
                total: totalLocks,
                expired: expiredLocks
            }
        },
        column1: [],
        column2: [],
        column3: []
    };

    words.sort((a, b) => a.replace(/\?/g, '').length - b.replace(/\?/g, '').length || a.replace(/\?/g, '').localeCompare(b.replace(/\?/g, '')));
    const wordsPerColumn = words.length >= 15 ? Math.ceil(words.length / 3) + 1 : Math.ceil(words.length / 3);

    for (let i = 0; i < words.length; i++) {
        const columnIdx = Math.floor(i / wordsPerColumn);
        const wordObj = { word: words[i], username, locked, index: i };
        // @ts-ignore
        board[`column${columnIdx + 1}`].push(wordObj);
    }

    return board;
}