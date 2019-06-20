import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DailyTaskComponent } from './daily-task/daily-task.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './guard/auth.guard'

const routes: Routes = [
    { path: "", redirectTo: '/dailyTask', pathMatch: 'full'},
    { path: "userLogin", component: LoginComponent },
    { path: "dailyTask", component: DailyTaskComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
    { path: "signup", component: SignupComponent },
    { path: '**', component: PageNotFoundComponent, data: { message: "Page not Found" } }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
