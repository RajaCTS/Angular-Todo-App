import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { DailyTaskComponent } from './daily-task/daily-task.component';
import { ThemeChangerService } from './services/theme-changer.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginService } from './services/login.service';
import { SignupComponent } from './signup/signup.component';
import { ModelServiceService } from './services/model-service.service';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { todoService } from './services/todo-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    DailyTaskComponent,
    LoginComponent,
    PageNotFoundComponent,
    SignupComponent,
    ModalContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ThemeChangerService, LoginService, ModelServiceService, todoService],
  bootstrap: [AppComponent],
  entryComponents: [ModalContentComponent]
})
export class AppModule { }
