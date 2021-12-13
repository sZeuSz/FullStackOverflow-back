
export interface question {
    question: string;
    student:  string;
    class: string;
    tags: string;
}

export interface answeredDB {
    answered: string;
}

export interface questionBD{
    question: string;
    student: string;
    class: string;
    tags: string;
    answered: boolean;
    submitAt: string;
    votes: number;
    answeredAt?: string;
    answeredBy?: string;
    answer?: string;
}
