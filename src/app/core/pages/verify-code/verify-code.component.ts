import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from '../../../shared/components/ui/error-message/error-message.component';
import { AuthService } from '../../../../../projects/auth/src/lib/auth.service';

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule,ErrorMessageComponent],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {

  apiError!: string
  isLoading: boolean = false
  verifyCodeForm!: FormGroup

  _authService = inject(AuthService)
  _router = inject(Router)

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.verifyCodeForm = new FormGroup({
      resetCode: new FormControl(null, [Validators.required]),
    })
  }

  onSubmitForm() {
    if (this.verifyCodeForm.invalid) {
      this.verifyCodeForm.markAllAsTouched()
    } else {
      this.apiError = ''
      this.isLoading = true
      this._authService.verifyCode(this.verifyCodeForm.value).subscribe({
        next: (res) => {
          this.isLoading = false
          // this.apiError = res.message
          this._router.navigate(['/auth/reset-password'])
        },
        error: (err) => {
          this.apiError = err.error.message
          this.isLoading = false
        },
        complete: () => {

          this.verifyCodeForm.reset()
        }
      })
    }
  }


}
