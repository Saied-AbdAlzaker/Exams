import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../../../shared/components/ui/error-message/error-message.component';
import { AuthService } from '../../../../../projects/auth/src/lib/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, RouterLink, ErrorMessageComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {

  apiError!: string
  isLoading: boolean = false
  forgetPassForm!: FormGroup

  _authService = inject(AuthService)
  _router = inject(Router)

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.forgetPassForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  onSubmitForm() {
    if (this.forgetPassForm.invalid) {
      this.forgetPassForm.markAllAsTouched()
    } else {
      this.apiError = ''
      this.isLoading = true
      this._authService.forgetPassword(this.forgetPassForm.value).subscribe({
        next: (res) => {
          this.isLoading = false
          // this.apiError = res.message
          this._router.navigate(['/auth/verify-code'])
        },
        error: (err) => {
          this.apiError = err.error.message
          this.isLoading = false
        },
        complete: () => {

          this.forgetPassForm.reset()
        }
      })
    }
  }

}
