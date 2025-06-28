import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  _httpClient=inject(HttpClient)

  constructor() { }
  
  customSubjects():Observable<any>{
    return this._httpClient.get(`https://exam.elevateegy.com/api/v1/subjects?limit=6`)
  }
  allSubjects(page: number, limit: number):Observable<any>{
    return this._httpClient.get(`https://exam.elevateegy.com/api/v1/subjects?page=${page}&limit=${limit}`)
  }
  
}
