import { Component } from '@angular/core';
import { QuizCardComponent } from "../quiz-card/quiz-card.component";

@Component({
  selector: 'app-dashboard',
  imports: [QuizCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
