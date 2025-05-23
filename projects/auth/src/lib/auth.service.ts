import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { AuthApi } from './base/AuthApi';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthEndPoint } from './enums/AuthApi.endPoints';
import { AuthAPIAdaptorService } from './adaptor/auth-api.adaptor';
import { forgetPasswordData, LoginData, registerData, resetPasswordData, verifyCodeData } from './interface/LoginData';
import { forgetPassRes, LoginRes, resetPassRes, verifyCodeRes } from './interface/LoginRes';
import { API_BASE_URL } from './token/api-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthApi {

  private _httpClient = inject(HttpClient)
  private _authAPIAdaptorService = inject(AuthAPIAdaptorService)
  private _baseUrl = inject(API_BASE_URL)
  constructor() { }

  // getUrl(endPoint: string): string {
  //   return `${this._baseUrl}${endPoint}`
  // }

  login(data: LoginData): Observable<LoginRes> {
    return this._httpClient.post(`${this._baseUrl}${AuthEndPoint.LOGIN}`, data).pipe(
      map((res: any) => this._authAPIAdaptorService.adaptSignin(res)),
      // catchError((err) => of(err))

    )
  }

  register(data: registerData): Observable<LoginRes> {
    return this._httpClient.post(`${this._baseUrl}${AuthEndPoint.REGISTER}`, data).pipe(
      map((res: any) => this._authAPIAdaptorService.adaptSignup(res))
    )
  }

  forgetPassword(data: forgetPasswordData): Observable<forgetPassRes> {
    return this._httpClient.post(`${this._baseUrl}${AuthEndPoint.FORGET_PASSWORD}`, data).pipe(
      map((res: any) => this._authAPIAdaptorService.adaptForgetPassword(res))
    )
  }

  verifyCode(data: verifyCodeData): Observable<verifyCodeRes> {
    return this._httpClient.post(`${this._baseUrl}${AuthEndPoint.VERIFY_CODE}`, data).pipe(
      map((res: any) => this._authAPIAdaptorService.adaptVerifyCode(res))
    )
  }

  resetPassword(data: resetPasswordData): Observable<resetPassRes> {
    return this._httpClient.put(`${this._baseUrl}${AuthEndPoint.RESET_PASSWORD}`, data).pipe(
      map((res: any) => this._authAPIAdaptorService.adaptResetPassword(res))
    )
  }

}
