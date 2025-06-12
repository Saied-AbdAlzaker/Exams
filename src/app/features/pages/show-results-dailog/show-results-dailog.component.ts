import { Component, Input, OnInit } from '@angular/core';
import { AnswerExam } from '../../interfaces/questions';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-results-dailog',
  imports: [DialogModule, CommonModule, FormsModule,RouterModule],
  templateUrl: './show-results-dailog.component.html',
  styleUrl: './show-results-dailog.component.scss'
})
export class ShowResultsDailogComponent implements OnInit {

  @Input() showResultsDailog!: boolean;
  @Input() answerError: AnswerExam[] = [];

  ngOnInit(): void {
    console.table(this.answerError)
  }

}
