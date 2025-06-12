import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AllSubjects, Subject } from '../../interfaces/subjects';
import { SubjectsService } from '../../services/subjects/subjects.service';

@Component({
  selector: 'app-quiz-card',
  imports: [RouterLink],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss'
})
export class QuizCardComponent implements OnInit {

  subjectsList!:AllSubjects
  subjects!:Subject[]
  private _subjectsService = inject(SubjectsService)

  ngOnInit(): void {
    this.getAllSubjects()
  }

  getAllSubjects() {
    this._subjectsService.customSubjects().subscribe({
      next: (res) => {
        this.subjectsList = res
        this.subjects = this.subjectsList.subjects

      }
    })
  }

}
