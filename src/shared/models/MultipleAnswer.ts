import {Answer} from "./Answer";

export interface MultipleAnswer {
    id: string;
    answers: Answer[];
    isCorrectResponseSelected?: boolean;
}