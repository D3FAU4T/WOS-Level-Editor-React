export interface Slot {
    word: string;
    username: string;
    locked: boolean;
    index: number;
}

export interface LevelData {
    lang: "English" | "Português" | "Français";
    fakeLetters: string;
    hiddenLetters: string;
    reveal: boolean;
    level: string;
    timebar: {
        timerPercentage: number;
        locks: {
            total: number;
            expired: number;
        }
    },
    column1: Slot[];
    column2: Slot[];
    column3: Slot[];
}