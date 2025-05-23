import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  _httpClient = inject(HttpClient)

  constructor() { }

  allExamsOnSubject(id:string):Observable<any>{
    return this._httpClient.get(`https://exam.elevateegy.com/api/v1/exams?subject=${id}`)
  }
}
