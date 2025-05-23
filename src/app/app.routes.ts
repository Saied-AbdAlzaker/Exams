import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedInGuard } from './core/guards/logged-in.guard';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
        path: "auth", component: AuthLayoutComponent, children: [
            { path: '', canActivate: [loggedInGuard], loadComponent: () => import('./core/pages/register/register.component').then(c => c.RegisterComponent) },
            { path: 'signin', canActivate: [loggedInGuard], loadComponent: () => import('./core/pages/login/login.component').then(c => c.LoginComponent) },
            { path: 'forget-password', canActivate: [loggedInGuard], loadComponent: () => import('./core/pages/forget-password/forget-password.component').then(c => c.ForgetPasswordComponent) },
            { path: 'verify-code', canActivate: [loggedInGuard], loadComponent: () => import('./core/pages/verify-code/verify-code.component').then(c => c.VerifyCodeComponent) },
            { path: 'reset-password', canActivate: [loggedInGuard], loadComponent: () => import('./core/pages/reset-password/reset-password.component').then(c => c.ResetPasswordComponent) },
        ]
    },
    {
        path: 'dashboard', component: MainLayoutComponent, children: [
            { path: '', canActivate: [authGuard], loadComponent: () => import('./features/pages/home/home.component').then(c => c.HomeComponent) },
            { path: "quiz-history", canActivate: [authGuard], loadComponent: () => import('./features/pages/home/components/quiz-history/quiz-history.component').then(c => c.QuizHistoryComponent) },
            { path: "quiz-container", canActivate: [authGuard], loadComponent: () => import('./features/pages/home/components/quiz-container/quiz-container.component').then(c => c.QuizContainerComponent) },
            { path: "diploma/:quizId", canActivate: [authGuard], loadComponent: () => import('./features/pages/home/components/diploma/diploma.component').then(c => c.DiplomaComponent) },
        ]
    }

];
