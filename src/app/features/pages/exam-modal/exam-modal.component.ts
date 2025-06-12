import { Component, Input, OnDestroy, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { QuestionService } from './../../services/question/question.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnswerExam, Questions } from '../../interfaces/questions';
import { ChartDailogComponent } from "../chart-dailog/chart-dailog.component";

@Component({
  selector: 'app-exam-modal',
  imports: [DialogModule, CommonModule, FormsModule, ChartDailogComponent],
  templateUrl: './exam-modal.component.html',
  styleUrl: './exam-modal.component.scss'
})
export class ExamModalComponent implements OnDestroy {

  visibleExam: boolean = false;
  questionList: Questions[] = []
  questionNumber: number = 0;
  timeIntervel: any;
  answerValue: string | undefined;
  answerExam: AnswerExam[] = [];
  answerError: AnswerExam[] = [];
  correct:number=0;
  inCorrect:number=0;
  chartDailog:boolean = false;

  @Input() visible: boolean = false;
  @Input() examId?: string;
  @Input() minutes: number = 0;
  seconds: number = 0

  _questionService = inject(QuestionService)

  startExam() {
    this.startTime();
    this.visible = false;
    this.visibleExam = true;
    if (this.examId) {
      this._questionService.getAllQuestions(this.examId).subscribe({
        next: (res) => {
          this.questionList = res.questions
          console.log(this.questionList);
        }, error: (err) => {
          console.log(err.message);
        }
      })
    }
  }
  // Timer
  startTime() {
    this.timeIntervel = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.stopTime()
        }
      } else {
        this.seconds--
      }
    }, 1000)
  }
  stopTime() {
    if (this.timeIntervel) {
      clearInterval(this.timeIntervel)
    }
  }

  // Next Answer
  nextQuestion() {
    if (this.answerValue) {
      if (this.questionNumber >= 0 && this.questionNumber < this.questionList.length) {
        const selectAnswer = this.questionList[this.questionNumber].answers.find(
          (item) => { item.answer === this.answerValue }
        );
        this.answerExam.push({
          id: this.questionList[this.questionNumber]._id,
          question: this.questionList[this.questionNumber].question,
          correctAnswer: this.questionList[this.questionNumber].correct,
          answers: this.questionList[this.questionNumber].answers,
          answerUser: this.answerValue,
          answerKey: selectAnswer ? selectAnswer?.key : null
        });

        if (this.questionNumber < this.questionList.length - 1) {
          this.questionNumber++
        }

        this.answerValue = undefined
      }
    }
  }

  // Back Question
  backQuestion() {
    if (this.questionNumber > 0) {
      this.questionNumber--;
      this.answerValue = this.answerExam[this.questionNumber].answerUser
    }
  }

  // Finish Exam
  finishExam(){
    this.nextQuestion();
    this.answerError = this.answerExam.filter((item)=> item.correctAnswer !== item.answerKey);
    console.table(this.answerError);
    this.visibleExam = false;
    this.chartDailog = true;
    this.correct = this.questionList.length - this.answerError.length;
    this.inCorrect = this.answerError.length;
  }

  ngOnDestroy(): void {
    this.stopTime()
  }

}
