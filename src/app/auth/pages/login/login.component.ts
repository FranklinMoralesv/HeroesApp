import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  
    mat-form-field{
      
      display:flex;
      flex-direction:column;
      
    }
    .login__title{
      font-size:2rem;
    }
    @media (min-width:  768px){
      .login__title{
      font-size:2.25rem;
    }
       
    }

    .login__button{
      width:100%;
      font-size: 1.25rem;
    }
    .login__button--warn{
      font-size:1rem;
    }
   
  `
  ]
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,
    private authService:AuthService,
    private fb:FormBuilder,
    private snackBar:MatSnackBar) { }

  hide = true;
  myForm:FormGroup=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
   
  });
  ngOnInit(): void {
  }


  login(){
    //Ir al backend

    this.authService.login(this.myForm.value.email,this.myForm.value.password)
    .subscribe(
      resp=>{
        
        if(resp){//el backend devuelve null si no existe
          console.log('Access Granted..Welcome');
          this.router.navigate(['./heroes/list']);
        }else{
         
          this.showSnakbar('Usuario no encontrado,Email o Contraseña invalido');
        }
      }
    ); 
  }

  showSnakbar(message:string){
    this.snackBar.open(message,'ok!',{
      duration:2700
    });
   }

   goToRegister(){
    this.router.navigate(['./auth/signup']);
   }
   validateField(field:string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }


    

  

}
