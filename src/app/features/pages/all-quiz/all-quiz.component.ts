import { Component, inject, OnInit } from '@angular/core';
import { AllSubjects, Subject } from '../../interfaces/subjects';
import { SubjectsService } from '../../services/subjects/subjects.service';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-all-quiz',
  imports: [RouterModule, PaginatorModule],
  templateUrl: './all-quiz.component.html',
  styleUrl: './all-quiz.component.scss'
})
export class AllQuizComponent implements OnInit {

  subjectsList!: AllSubjects;
  subjects!: Subject[];
  totalRecords: number = 0;
  page: number = 0;
  limit: number = 6;

  private _subjectsService = inject(SubjectsService)

  ngOnInit(): void {
    this.getAllSubjects(this.page, this.limit)
  }

  getAllSubjects(page: number, limit: number) {
    this._subjectsService.allSubjects(page, limit).subscribe({
      next: (res) => {
        this.subjectsList = res
        this.subjects = this.subjectsList.subjects

      }
    })
  }

  // Pagination
  onPageChange(event: any): void {
    const page = event.page + 1; // PrimeNG starts at 0, API may start at 1
    const limit = event.rows;
    this.getAllSubjects(page, limit);
  }

}
