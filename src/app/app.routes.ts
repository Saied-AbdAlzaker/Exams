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
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: '', component: MainLayoutComponent, children: [
            { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./features/pages/dashboard/dashboard.component').then(c => c.DashboardComponent) },
            { path: "quiz-history", canActivate: [authGuard], loadComponent: () => import('./features/pages/quiz-history/quiz-history.component').then(c => c.QuizHistoryComponent) },
            { path: "all-quiz", canActivate: [authGuard], loadComponent: () => import('./features/pages/all-quiz/all-quiz.component').then(c => c.AllQuizComponent) },
            { path: "diploma/:quizId", canActivate: [authGuard], loadComponent: () => import('./features/pages/diploma/diploma.component').then(c => c.DiplomaComponent) }]
    }

];
