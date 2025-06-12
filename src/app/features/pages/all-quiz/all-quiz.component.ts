import { Component, inject, OnInit } from '@angular/core';
import { AllSubjects, Subject } from '../../interfaces/subjects';
import { SubjectsService } from '../../services/subjects/subjects.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-quiz',
  imports: [RouterModule],
  templateUrl: './all-quiz.component.html',
  styleUrl: './all-quiz.component.scss'
})
export class AllQuizComponent implements OnInit {

  subjectsList!: AllSubjects
  subjects!: Subject[]
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
