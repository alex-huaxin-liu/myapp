import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Course} from '../model/course.model';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

  courses: Observable<any[]>;
  activeCourse: Observable<any>;
  storageRef: any;

  constructor(private db: AngularFireDatabase) {
    this.courses = this.db.list('courses').valueChanges(); 
    this.storageRef = firebase.storage().ref();
  }

  getCourses(){
    return this.courses;
  }

  getCourseDetail( id: any){
    this.activeCourse = this.db.object('courses/'+id).valueChanges();
    return this.activeCourse;
  }

  addCourse(course: Course){
      for(let selectedFile of [((<HTMLInputElement>document.getElementById('image')).files[0])]){
        let path = '/courseimages/' + selectedFile.name;
        let iRef = this.storageRef.child(path);
        iRef.put(selectedFile).then(
          (snapshot) =>{
            course.image = selectedFile.name;
            course.path = path;
            this.db.object('courses/' + course.number).set(course);
          }
        )
      }
  }

  updateCourse(id: string, course: Course) {
    if(((<HTMLInputElement>document.getElementById('image')).files.length>0)){
      for(let selectedFile of [((<HTMLInputElement>document.getElementById('image')).files[0])]){
        let path = '/courseimages/' + selectedFile.name;
        let iRef = this.storageRef.child(path);
        iRef.put(selectedFile).then(
          (snapshot) =>{
            course.image = selectedFile.name;
            course.path = path;
          }
        )
      }
    }

    let itemsRef = this.db.list('courses');
    itemsRef.update(id, course);
  }

  deleteCourse(id: string){
    this.db.list('courses').remove(id);
  }

  
}

