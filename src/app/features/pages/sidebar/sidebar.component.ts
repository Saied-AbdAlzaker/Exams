import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface IMenu {
  title: string,
  icon: string,
  link: string
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  _router=inject(Router)

  menu: IMenu[] = [
    {
      title: 'Dashboard',
      icon: 'fa-solid fa-grip-vertical',
      link: '/dashboard'
    },
    {
      title: 'Quiz History',
      icon: 'fa-solid fa-q',
      link: '/quiz-history'
    }
  ]

  logout(){
    localStorage.clear();
    this._router.navigate(['/'])
  }

}
