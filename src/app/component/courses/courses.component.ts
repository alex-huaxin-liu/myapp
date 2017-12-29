import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service' ;
import {DataTableModule,SharedModule} from 'primeng/primeng';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any;
  size:any;
  constructor(private firebaseService: FirebaseService){}

  ngOnInit() {
    this.firebaseService.getCourses().subscribe( courses =>{
      this.courses = courses;
      this.size = courses.length;
    })
  }

}
