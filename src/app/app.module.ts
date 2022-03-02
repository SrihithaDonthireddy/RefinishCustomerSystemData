
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './Shared/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { TokenParams } from './Shared/TokenParams';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import{FormsModule}from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import{MatDialogModule}from '@angular/material/dialog';
import{ReactiveFormsModule}from'@angular/forms'
import{MatProgressSpinnerModule}from '@angular/material/progress-spinner'
import { NetworkInterceptor } from './Shared/network.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
   
  ],
  providers: [{
  provide:HTTP_INTERCEPTORS,
  useClass:NetworkInterceptor,
  multi:true
  },AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
