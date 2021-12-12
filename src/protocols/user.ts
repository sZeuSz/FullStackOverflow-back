export interface user{
    name: string;
    class: string;
}

export interface userDB{
    id: number;
    name: string;
    class: string;
    answers: number;
    points: number;
}

export interface updateCount{
    answers: number;
    points: number;
}