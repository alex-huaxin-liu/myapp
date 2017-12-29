import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  id: any;
  name: any;
  number: any;
  description: any;
  credit: any;
  booklink: any;
  prerequisite: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getCourseDetail(this.id).subscribe(course =>{
      this.name = course.name;
      this.number = course.number;
      this.description = course.description;
      this.credit = course.credit;
      this.prerequisite = course.prerequisite;
      this.booklink = course.booklink;
    })
  }

  onEditSubmit(){
    let course = {
      number: this.number,
      name: this.name,
      description: this.description,
      credit: this.credit,
      booklink: this.booklink,
      prerequisite: this.prerequisite
    }
 
    this.firebaseService.updateCourse(this.id, course);
    this.router.navigate(['/courses']);
  }

}
