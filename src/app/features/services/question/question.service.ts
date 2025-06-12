import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  _httpClient=inject(HttpClient)

  constructor() { }

  getAllQuestions(id:string):Observable<any>{
    return this._httpClient.get(`https://exam.elevateegy.com/api/v1/questions?exam=${id}`)
  }
}
