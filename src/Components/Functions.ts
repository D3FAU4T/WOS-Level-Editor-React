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
    return [...level.column1, ...level.column2, ...level.column3]
        .flatMap(slot => slot.word)
        .length;
}

export const getCountOfFoundedWords = (level: LevelData) => {
    return [...level.column1, ...level.column2, ...level.column3]
        .flatMap(slot => slot.word)
        .filter(word => !word.includes('?'))
        .length;
}

export const getWordsOfTheLevel = (level: LevelData) => {
    return [...level.column1, ...level.column2, ...level.column3]
        .flatMap(slot => slot.word)
        .join(' ');
}

export const getCurrentPoints = (level: LevelData) => {
    return [...level.column1, ...level.column2, ...level.column3]
        .flatMap(slot => slot.word)
        .filter(word => !word.includes('?'))
        .map(word => wordPoint(word))
        .reduce((a, b) => a + b, 0);
}

export const getTotalPoints = (level: LevelData) => {
    return [...level.column1, ...level.column2, ...level.column3]
        .flatMap(slot => slot.word)
        .map(word => wordPoint(word))
        .reduce((a, b) => a + b, 0);
}

export const makePassingPoints = (level: LevelData, totalPointForPointbar: number) => {
    let passingPoints = 0;
    switch (level.level) {
        case '1': passingPoints = Math.round(totalPointForPointbar * 0.45); break;
        case '2': passingPoints = Math.round(totalPointForPointbar * 0.47); break;
        case '3': passingPoints = Math.round(totalPointForPointbar * 0.48); break;
        case '4': passingPoints = Math.round(totalPointForPointbar * 0.5); break;
        case '5': passingPoints = Math.round(totalPointForPointbar * 0.51); break;
        case '6': passingPoints = Math.round(totalPointForPointbar * 0.52); break;
        case '7': passingPoints = Math.round(totalPointForPointbar * 0.53); break;
        case '8': passingPoints = Math.round(totalPointForPointbar * 0.56); break;
        case '9': passingPoints = Math.round(totalPointForPointbar * 0.57); break;
        case '10': passingPoints = Math.round(totalPointForPointbar * 0.58); break;
        case '11': passingPoints = Math.round(totalPointForPointbar * 0.59); break;
        case '12': passingPoints = Math.round(totalPointForPointbar * 0.61); break;
        case '13': passingPoints = Math.round(totalPointForPointbar * 0.59); break;
        case '14': passingPoints = Math.round(totalPointForPointbar * 0.63); break;
        case '15': passingPoints = Math.round(totalPointForPointbar * 0.65); break;
        case '16': passingPoints = Math.round(totalPointForPointbar * 0.67); break;
        case '17': passingPoints = Math.round(totalPointForPointbar * 0.68); break;
        case '18': passingPoints = Math.round(totalPointForPointbar * 0.69); break;
        case '19': passingPoints = Math.round(totalPointForPointbar * 0.7); break;
        case '20': passingPoints = Math.round(totalPointForPointbar * 0.73); break;
        case '21': passingPoints = Math.round(totalPointForPointbar * 0.74); break;
        case '22': passingPoints = Math.round(totalPointForPointbar * 0.75); break;
        case '23': passingPoints = Math.round(totalPointForPointbar * 0.76); break;
        case '24': passingPoints = Math.round(totalPointForPointbar * 0.78); break;
        case '25': passingPoints = Math.round(totalPointForPointbar * 0.79); break;
        case '26': passingPoints = Math.round(totalPointForPointbar * 0.81); break;
        case '27': passingPoints = Math.round(totalPointForPointbar * 0.82); break;
        case '28': passingPoints = Math.round(totalPointForPointbar * 0.83); break;
        case '29': passingPoints = Math.round(totalPointForPointbar * 0.85); break;
        case '30': passingPoints = Math.round(totalPointForPointbar * 0.86); break;
        case '31': passingPoints = Math.round(totalPointForPointbar * 0.87); break;
        case '32': passingPoints = Math.round(totalPointForPointbar * 0.89); break;
        case '33': passingPoints = Math.round(totalPointForPointbar * 0.9); break;
        default: passingPoints = Math.round(totalPointForPointbar * 0.9); break;
    }
    return passingPoints;
}

export const extractScore = (level: LevelData) => {
    const score: { [username: string]: number } = {};

    level.column1
        .concat(level.column2, level.column3)
        .forEach(slot => {
            if (score[slot.username] === undefined) {
                score[slot.username] = wordPoint(slot.word.replace(/\?/g, ""));
            }

            else {
                score[slot.username] += wordPoint(slot.word.replace(/\?/g, ""));
            }
        });

    return Object.entries(score)
        .sort((a, b) => b[1] - a[1])
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
}



export const calculateStars = (totalPoints: number, currentPoints: number, levelNumber: number): number => {

    let passingPercentage = 0.45;

    switch (levelNumber) {
        case 1: passingPercentage = 0.45;
        case 2: passingPercentage = 0.47;
        case 3: passingPercentage = 0.48;
        case 4: passingPercentage = 0.5;
        case 5: passingPercentage = 0.51;
        case 6: passingPercentage = 0.52;
        case 7: passingPercentage = 0.53;
        case 8: passingPercentage = 0.56;
        case 9: passingPercentage = 0.57;
        case 10: passingPercentage = 0.58;
        case 11: passingPercentage = 0.59;
        case 12: passingPercentage = 0.61;
        case 13: passingPercentage = 0.59;
        case 14: passingPercentage = 0.63;
        case 15: passingPercentage = 0.65;
        case 16: passingPercentage = 0.67;
        case 17: passingPercentage = 0.68;
        case 18: passingPercentage = 0.69;
        case 19: passingPercentage = 0.7;
        case 20: passingPercentage = 0.73;
        case 21: passingPercentage = 0.74;
        case 22: passingPercentage = 0.75;
        case 23: passingPercentage = 0.76;
        case 24: passingPercentage = 0.78;
        case 25: passingPercentage = 0.79;
        case 26: passingPercentage = 0.81;
        case 27: passingPercentage = 0.82;
        case 28: passingPercentage = 0.83;
        case 29: passingPercentage = 0.85;
        case 30: passingPercentage = 0.86;
        case 31: passingPercentage = 0.87;
        case 32: passingPercentage = 0.89;
        case 33: passingPercentage = 0.9;
        default: passingPercentage = 0.9;
    }

    const passingPoint = Math.round(totalPoints * passingPercentage);

    console.log(passingPoint, totalPoints, currentPoints);

    if (currentPoints > (totalPoints - 10)) return 3;
    else if (currentPoints >= (totalPoints - 9)) return 2;
    else if (currentPoints >= passingPoint) return 1;
    else return 0;
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
    expiredLocks = 0,
    fakeLetters = "",
    hiddenLetters = ""
) => {

    const board: LevelData = {
        lang: language,
        fakeLetters,
        hiddenLetters,
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

export const rankingSorter = (ranking: {[username: string]: number }) => Object.entries(ranking)
.sort((a, b) => b[1] - a[1])
.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})