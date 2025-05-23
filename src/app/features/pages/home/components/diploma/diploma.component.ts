import { Component, inject, OnInit } from '@angular/core';
import { ExamsService } from '../../../../services/exams/exams.service';
import { ActivatedRoute } from '@angular/router';
import { Exam } from '../../../../../shared/interfaces/exams';

@Component({
  selector: 'app-diploma',
  imports: [],
  templateUrl: './diploma.component.html',
  styleUrl: './diploma.component.scss'
})
export class DiplomaComponent implements OnInit {

  quizId!: string
  listDiploma!:Exam[]

  _examsService = inject(ExamsService)
  _activatedRoute = inject(ActivatedRoute)

  constructor() {
    this.quizId = this._activatedRoute.snapshot.params['quizId']
    console.log(this._activatedRoute.snapshot.params);

  }

  ngOnInit(): void {
    this.getAllExamsOnSubject(this.quizId)
  }

  getAllExamsOnSubject(id: string) {
    this._examsService.allExamsOnSubject(id).subscribe({
      next: (res) => {
        console.log(res);
        this.listDiploma = res.exams
      }
    })
  }

}
