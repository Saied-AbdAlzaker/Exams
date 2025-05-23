import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './shared/services/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'exams';

  _flowbiteService=inject(FlowbiteService)

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
