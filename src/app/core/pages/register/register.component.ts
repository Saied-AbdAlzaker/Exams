import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'auth';
import { ErrorMessageComponent } from '../../../shared/components/ui/error-message/error-message.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, ErrorMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  apiError!: string
  isLoading: boolean = false
  registerForm!: FormGroup

  _authService = inject(AuthService)
  _router = inject(Router)

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      firstName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    }, this.validateRePassword)
  }

  onSubmitForm() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
    } else {
      this.apiError = ''
      this.isLoading = true
      this._authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);

          this.isLoading = false
          localStorage.setItem("userToken", res.token)
          // this.apiError = res.message
          this._router.navigate(['/auth/signin'])
        },
        error: (err) => {
          this.apiError = err.error.message
          this.isLoading = false
        },
        complete: () => {

          this.registerForm.reset()
        }
      })
    }
  }

  validateRePassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    if (password == rePassword) {
      return null;
    } else {
      return { misMatch: true }
    }
  }

}
