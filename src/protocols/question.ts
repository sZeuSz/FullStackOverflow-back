
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
    answeredAt?: string;
    answeredBy?: string;
    answer?: string;
}
