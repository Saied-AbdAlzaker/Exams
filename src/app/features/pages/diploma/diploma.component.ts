import { Component, inject, OnInit } from '@angular/core';
import { ExamsService } from '../../services/exams/exams.service';
import { ActivatedRoute } from '@angular/router';
import { Exam } from '../../interfaces/exams';
import { ExamModalComponent } from "../exam-modal/exam-modal.component";
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diploma',
  imports: [ExamModalComponent, CommonModule, DialogModule],
  templateUrl: './diploma.component.html',
  styleUrl: './diploma.component.scss'
})
export class DiplomaComponent implements OnInit {

  quizId!: string
  listDiploma!: Exam[]
  visible: boolean = false;
  examDuration!: number;
  examId!: string;

  _examsService = inject(ExamsService)
  _activatedRoute = inject(ActivatedRoute)

  constructor() {
    this.quizId = this._activatedRoute.snapshot.params['quizId']
    console.log(this._activatedRoute.snapshot.params);

  }

  ngOnInit(): void {
    this.getAllExamsOnSubject(this.quizId)
  }
  // getAllExamsOnSubject
  getAllExamsOnSubject(id: string) {
    this._examsService.allExamsOnSubject(id).subscribe({
      next: (res) => {
        console.log(res);
        this.listDiploma = res.exams
      }
    })
  }
  // showDialog
  showDialog(id: string, duration: number) {
    this.examDuration = duration;
    this.examId = id
    this.visible = true;    
  }

}
