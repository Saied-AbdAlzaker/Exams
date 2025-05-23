import { Injectable } from '@angular/core';
import { Adaptor } from '../interface/adaptor';
import { forgetPassApiData, forgetPassRes, LoginApiData, LoginRes, resetPassApiData, resetPassRes, verifyCodeApiData, verifyCodeRes } from '../interface/LoginRes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIAdaptorService implements Adaptor {

  userData: BehaviorSubject<any> = new BehaviorSubject('')

  constructor() { }

  adaptSignin(data: LoginApiData): LoginRes {
    return {
      message: data.message,
      token: data.token,
      userName: data.user.username,
      userEmail: data.user.email
    }
  }

  adaptSignup(data: LoginApiData): LoginRes {
    return {
      message: data.message,
      token: data.token,
      userName: data.user.username,
      userEmail: data.user.email
    }
  }

  adaptForgetPassword(data: forgetPassApiData): forgetPassRes {
    return {
      message: data.message,
      info: data.info
    }
  }
  adaptVerifyCode(data: verifyCodeApiData): verifyCodeRes {
    return {
      resetCode: data.resetCode

    }
  }
  adaptResetPassword(data: resetPassApiData): resetPassRes {
    return {
      email: data.email
    }
  }

}
