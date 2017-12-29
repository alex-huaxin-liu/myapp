import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  id: any;
  course: any;
  prerequisite: any[];

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getCourseDetail(this.id).subscribe( course =>{
      this.course = course;
      if(course.prerequisite){
         this.prerequisite = course.prerequisite.split(";");
      }
      this.setImageUrl(course.path);
    });
  }

  setImageUrl(path: string){
    var storageRef = firebase.storage().ref();
    storageRef.child(path).getDownloadURL().then(function(url) {
     document.getElementById('courseimg').setAttribute("src", url);
    }).catch(function(error) {
      console.log(error);
    });
  }

  onDeleteClick(){
    this.firebaseService.deleteCourse(this.id);
    this.router.navigate(['/courses']);
  }
}
