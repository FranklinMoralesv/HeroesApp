import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../interfaces/auth.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: [ `
  
  mat-form-field{
    
    display:flex;
    flex-direction:column;
    
  }

  .register__title{
    font-size:1.25rem;
  }
  @media (min-width:  768px){
    .register__title{
    font-size:2.25rem;
  }
     
  }
  .register__button{
      width:100%;
      font-size: 1.25rem;
    }
    .register__button--warn{
      font-size:1rem;
      width:100%;
      text-align:end;
     
    }
 
`
  ]
})
export class RegisterComponent implements OnInit {

  hide = true;
  myForm:FormGroup=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    user:['',[Validators.required,Validators.minLength(4)]],
  });
  constructor(private router:Router,
    private authService:AuthService,
    private fb:FormBuilder,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }
  
  register(){
    const newUser:Auth=this.myForm.value;

    newUser.email=newUser.email.toLocaleLowerCase();

    this.authService.register(newUser)
      .subscribe(registerStatus=>{
        
          this.showSnakbar(registerStatus);
        
      });
      
  }
  validateField(field:string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }
  goToLogin(){
    this.router.navigate(['./auth/login']);
  }

  showSnakbar(message:string){
    this.snackBar.open(message,'ok!',{
      duration:2500
    });
   }
  
  

}
