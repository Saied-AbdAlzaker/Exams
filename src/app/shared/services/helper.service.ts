import { afterNextRender, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  userData: BehaviorSubject<any> = new BehaviorSubject('')

  constructor() {
    afterNextRender(() => {
      this.saveData()
    })
  }

  saveData() {
    if (localStorage.getItem('userToken')) {
      this.userData.next(jwtDecode(localStorage.getItem('userToken')!))
    }
  }


}
