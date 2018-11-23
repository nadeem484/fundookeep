import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import {MatFormFieldModule,
        MatInputModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './component/signup/signup.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule, MatIconModule, MatSidenavModule, MatListModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';

import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PasswordForgotComponent } from './component/password-forgot/password-forgot.component';
import { PasswordresetComponent } from './component/passwordreset/passwordreset.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NotesComponent } from './component/notes/notes.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { AppNotesComponent } from './component/app-notes/app-notes.component';
import { MoreComponent } from './component/more/more.component';
import {MatMenuModule} from '@angular/material/menu';
import { ArchiveComponent } from './component/archive/archive.component';
import { ChangeColorComponent } from './component/change-color/change-color.component';
import { MainNotesComponent } from './component/main-notes/main-notes.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateComponent } from './component/update/update.component';
import { AddLabelComponent } from './component/add-label/add-label.component';
import { CreateLabelComponent } from './component/create-label/create-label.component';
import { SideLabelComponent } from './component/side-label/side-label.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import { SearchPipe } from './search.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ArchiveListComponent } from './component/archive-list/archive-list.component';
import { TrashComponent } from '../app/component/trash/trash.component';
import { PinComponent } from './component/pin/pin.component';
import { SerachNotesComponent } from './component/serach-notes/serach-notes.component';
import {DataService} from './services/search.service'
 




// import { AuthService } from '../app/services/auth.service';
// import { AuthGuard } from '../app/guard/auth.guard';



@NgModule({
  declarations: [
    AppComponent,LoginComponent,SignupComponent,PasswordForgotComponent,PasswordresetComponent,
    DashboardComponent,NavbarComponent,NotesComponent,ReminderComponent, AppNotesComponent,
    MoreComponent, ArchiveComponent, ChangeColorComponent, MainNotesComponent, UpdateComponent, AddLabelComponent,
    CreateLabelComponent, SideLabelComponent, SearchPipe, ArchiveListComponent, TrashComponent, PinComponent, SerachNotesComponent
  ],

  imports: [
    BrowserModule, MatFormFieldModule, AppRoutingModule, MatInputModule, FlexLayoutModule,
    MatCardModule,MatIconModule,MatButtonModule,MatSelectModule,BrowserAnimationsModule,
    MatButtonToggleModule,HttpClientModule,FormsModule,ReactiveFormsModule,MatSnackBarModule,
    MatToolbarModule,LayoutModule,MatSidenavModule,MatListModule,MatMenuModule,MatDialogModule,
    MatAutocompleteModule,MatChipsModule,MatCheckboxModule

  ],
  // to register a service we use providers meta data
  providers: [DataService], // including signup service in providers array
  bootstrap: [AppComponent],
  entryComponents:[UpdateComponent,AppNotesComponent,AddLabelComponent,MoreComponent,
   CreateLabelComponent,NavbarComponent,
  ]
  
})
export class AppModule { }
