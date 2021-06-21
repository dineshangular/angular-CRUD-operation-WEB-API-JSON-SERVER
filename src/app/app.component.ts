import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-operation-api';
  allUsers:object;
  userObj:any= {
    id:'',
    name:'',
    mobile:'',
    email:'',
    position:''
  }
  isEdit:boolean = false
  constructor(private commonService:CommonService){}
  ngOnInit() {
    this.getLatestUser();
  }
  addUser(formObj) {
    this.commonService.createUser(formObj).subscribe((response)=>{
      this.getLatestUser()
    })
    this.userObj={}
  }
  getLatestUser() {
    this.commonService.getAllUser().subscribe((response)=>{
      this.allUsers = response
    })
  }
  editUser(user) {
    this.isEdit = true;
    this.userObj = user;
  }
  updateUser() {
    this.isEdit = !this.isEdit;
    this.commonService.updateUser(this.userObj).subscribe((response)=>{
      this.getLatestUser();
    })
    this.userObj={}
  }
  deleteUser(user) {
    this.commonService.deleteUser(user).subscribe(()=>{
      this.getLatestUser();
    })
  }
}
