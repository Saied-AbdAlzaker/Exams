import { Exam } from "./exams"
import { Subject } from "./subjects"

export interface Questions {
  _id: string
  question: string
  answers: Answer[]
  type: string
  correct: string
  subject: Subject
  exam: Exam
  createdAt: string
}

export interface Answer {
  answer: string
  key: string
}

export interface AnswerExam {
  id:string,
  question:string,
  correctAnswer:string,
  answers:Answer[],
  answerUser:string,
  answerUserKey:string|null
}




