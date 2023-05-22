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

export type TopbarMode = "Hit" | "No Hit" | "Completed" | "1 fake" | "1 fake & 1 hidden" | "2 fakes & 1 hidden" | "2 fakes & 2 hidden" | "2 fakes & 3 hidden" | "hidden"