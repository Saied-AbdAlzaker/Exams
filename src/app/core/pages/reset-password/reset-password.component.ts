import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from "../../../shared/components/ui/error-message/error-message.component";
import { AuthService } from '../../../../../projects/auth/src/lib/auth.service';


@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  apiError!: string
  isLoading: boolean = false
  resetPasswordForm!: FormGroup

  _authService = inject(AuthService)
  _router = inject(Router)

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    })
  }

  onSubmitForm() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched()
    } else {
      this.apiError = ''
      this.isLoading = true
      this._authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          this.isLoading = false
          // localStorage.setItem("userToken", res.token)
          // this.apiError = res.message
          this._router.navigate(['/auth/signin'])
        },
        error: (err) => {
          this.apiError = err.error.message
          this.isLoading = false
        },
        complete: () => {

          this.resetPasswordForm.reset()
        }
      })
    }
  }

}
