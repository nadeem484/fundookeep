import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { PasswordForgotComponent } from './component/password-forgot/password-forgot.component';
import { PasswordresetComponent } from './component/passwordreset/passwordreset.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NotesComponent } from './component/notes/notes.component';
import { AppComponent } from './app.component';
import { AuthGuard } from '../app/guard/auth.guard'
import { MainNotesComponent } from './component/main-notes/main-notes.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { ArchiveListComponent } from './component/archive-list/archive-list.component';
import { SideLabelComponent } from './component/side-label/side-label.component';
import { TrashComponent } from './component/trash/trash.component';
import { ServerMatchMedia } from '@angular/flex-layout';
import { SerachNotesComponent } from './component/serach-notes/serach-notes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path: 'passwordforgot', component: PasswordForgotComponent},
  {path: 'dashboard',component:DashboardComponent, canActivate:[AuthGuard] },
  {path:'navbar',component:NavbarComponent, canActivate:[AuthGuard],
  children:[
    {path:'main-notes', component:MainNotesComponent},
    {path:'archive', component:ArchiveListComponent},
    {path: 'label/:labelname',component:SideLabelComponent},
    {path:'trash',component:TrashComponent},
    {path:'search', component:SerachNotesComponent},
    // {path:'app-notes', component:AppComponent}
  ]},

  {path: 'resetpassword/:id', component: PasswordresetComponent},
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }



// canActivate:[AuthGuard]