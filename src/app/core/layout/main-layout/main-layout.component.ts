import { Component } from '@angular/core';
import { SidebarComponent } from '../../../features/pages/home/components/sidebar/sidebar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { AvatarModule } from 'primeng/avatar';
// import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
