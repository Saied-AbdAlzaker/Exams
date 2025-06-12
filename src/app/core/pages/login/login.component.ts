import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from "../../../shared/components/ui/error-message/error-message.component";
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../../store/auth/auth.actions';
import { HelperService } from '../../../shared/services/helper.service';
import { AuthService } from '../../../../../projects/auth/src/lib/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  apiError!: string
  isLoading: boolean = false
  loginForm!: FormGroup

  _authService = inject(AuthService)
  _router = inject(Router)
  _helperService = inject(HelperService)
  // _store = inject(Store)

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    })
  }

  onSubmitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    } else {
      this.apiError = ''
      this.isLoading = true
      this._authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false
          localStorage.setItem("userToken", res.token)
          this._helperService.saveData()
          // this._store.dispatch(loginSuccess({ token: res.token }))
          
          this._router.navigate(['/dashboard'])
        },
        error: (err) => {
          this.apiError = err.error.message
          this.isLoading = false
        },
        complete: () => {

          this.loginForm.reset()
        }
      })
    }
  }


}
