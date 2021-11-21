import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgGridTestComponent } from './Components/agGrid/ag-grid-test.component';
import { LoginPageComponent } from './Components/loginPage/login-page.component';
import { AuthGuard } from './gaurds/auth.guards';
//import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: AgGridTestComponent, canActivate: [AuthGuard] },
  { path: '**', component: AgGridTestComponent }
];

@NgModule({
  //configure the router at the application's root
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
