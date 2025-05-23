import { Component, inject, OnInit } from '@angular/core';
import { AllSubjects, Subject } from '../../../../../shared/interfaces/subjects';
import { SubjectsService } from '../../../../services/subjects/subjects.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz-container',
  imports: [RouterLink],
  templateUrl: './quiz-container.component.html',
  styleUrl: './quiz-container.component.scss'
})
export class QuizContainerComponent implements OnInit{

  subjectsList!:AllSubjects
  subjects!:Subject[]
  private _subjectsService = inject(SubjectsService)

  ngOnInit(): void {
    this.getAllSubjects()
  }

  getAllSubjects() {
    this._subjectsService.allSubjects().subscribe({
      next: (res) => {
        this.subjectsList = res
        this.subjects = this.subjectsList.subjects

      }
    })
  }

}
