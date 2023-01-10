import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userform: FormGroup;
  user:User;
  constructor(private us:UserServiceService,private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userform = this.formBuilder.group({
      userName: [''],
      email: [''],
      password: [''],
  });

  this.userform.valueChanges.subscribe(
    data=>{console.log(this.userform.value)}
  )
}
ajouter(){
  console.log(this.userform.value);
  this.us.registration(this.userform.value).subscribe(
  data=>{
    this.user=data; 
    this.router.navigate(["/login"])
  } 
  );  
}
}
