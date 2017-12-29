import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// We need to import the ReactiveFormsModule and HttpModule
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { AngularFireModule } from 'angularfire2';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { RouterModule, Routes } from '@angular/router';
 
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { CoursesComponent } from './component/courses/courses.component';
import { CourseComponent } from './component/course/course.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AddCourseComponent } from './component/add-course/add-course.component';
import { EditCourseComponent } from './component/edit-course/edit-course.component';


import { FirebaseService} from './services/firebase.service';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';


const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'courses', component: CoursesComponent},
  {path:'course/:id', component: CourseComponent},
  {path:'addCourse', component: AddCourseComponent},
  {path:'editCourse/:id', component: EditCourseComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesComponent,
    CourseComponent,
    NavbarComponent,
    AddCourseComponent,
    EditCourseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
    DataTableModule,
    SharedModule,
    DataListModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
