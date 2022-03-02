import { AuthService } from './../Shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:string='';
 
  userData = {
        username :'',
        password :'',
  } 

  constructor(
    private router:Router,
    private authService:AuthService,
  ) { }

  ngOnInit(): void {
  }

  loginUser(){

    this.error = '';
    this.authService.login(this.userData)
    .subscribe((res) => {
       localStorage.setItem('token',res.access_token)
       localStorage.setItem('userName',res.userName)
      this.router.navigate(['/home']);
    }, (err)=>{
      this.error = err.error.error_description;
    })
  }
  
}
