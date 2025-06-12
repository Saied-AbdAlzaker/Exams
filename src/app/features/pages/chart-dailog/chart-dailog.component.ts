import { ChangeDetectorRef, Component, inject, Input, OnInit, PLATFORM_ID, effect } from '@angular/core';
import { AnswerExam, Questions } from '../../interfaces/questions';
import { DialogModule } from 'primeng/dialog';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ShowResultsDailogComponent } from "../show-results-dailog/show-results-dailog.component";
// import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
// import { ChartModule } from 'primeng/chart';
// import { AppConfigService } from '@/service/appconfigservice';

@Component({
  selector: 'app-chart-dailog',
  imports: [DialogModule, CommonModule, FormsModule, ChartModule, ShowResultsDailogComponent],
  templateUrl: './chart-dailog.component.html',
  styleUrl: './chart-dailog.component.scss'
})
export class ChartDailogComponent implements OnInit {

  data: any;
  options: any;
  correct!: number;
  inCorrect!: number;
  showResultsDailog: boolean = false;

  @Input() chartDailog!: boolean;
  @Input() questionList: Questions[] = [];
  @Input() answerError: AnswerExam[] = [];

  platformId = inject(PLATFORM_ID);

  // configService = inject(AppConfigService);

  // designerService = inject(DesignerService);

  constructor(private cd: ChangeDetectorRef) { }

  // themeEffect = effect(() => {
  //   if (this.configService.transitionComplete()) {
  //     if (this.designerService.preset()) {
  //       this.initChart();
  //     }
  //   }
  // });

  ngOnInit() {
    this.correct = this.questionList.length - this.answerError.length;
    this.inCorrect = this.answerError.length;
    console.log(this.correct, this.inCorrect);

    this.initChart();
  }

  initChart() {

    this.data = {
      labels: [`Correct ${this.correct}`, `Incorrect ${this.inCorrect}`],
      textColor: ['#02369C', '#CC1010'],
      datasets: [
        {
          data: [this.correct, this.inCorrect],
          backgroundColor: ['#02369C', '#CC1010'],
          hoverBackgroundColor: ['#0456f9', '#f82323'],
        }
      ]
    };

    this.options = {
      cutout: '90%',
      cutoutPercentage: 40,
      display: true,
      responsive: true,
      align: 'end',
      plugins: {
        legend: {
          position: 'right',
          align: 'center',
          fullWidth: true,
          display: true,

          maintainAspectRatio: true,
          labels: {
            // usePointStyle: true,
            // color: textColor,
            boxWidth: 5,
          }
        }
      }
    };

  }

  showResult() {
    this.chartDailog = false;
    this.showResultsDailog = true;
  }


}
