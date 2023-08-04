import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './dashboard/pages/courses/courses.module';
import { GoalsModule } from './dashboard/pages/goals/goals.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    AuthModule,
    CoursesModule,
    GoalsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
