import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { Course} from '../../model/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  number: string;
  name: string;
  description: string;
  image: any;
  credit: any;
  booklink: any;
  prerequisite: any;
  
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {}

  onAddSubmit(){
    let course = {
      number: this.number,
      name: this.name,
      description: this.description,
      credit: this.credit,
      booklink: this.booklink,
      prerequisite: this.prerequisite
    }
    this.firebaseService.addCourse(course);
    this.router.navigate(['courses']);
  }

}
