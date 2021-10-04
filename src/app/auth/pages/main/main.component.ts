import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles:[

    `
  .main__container{
  margin:0 auto;
  width: min(90%, 50rem);
}



    .main__content{
      margin-top:10vh;
    }

    .main__logo {
      padding:3.5rem;
      font-size:3rem;
      margin:0;
    }
    @media (min-width:  768px){
      .main__content{
      margin-top:12vh;
     
    }
       
    }

    `
  ]
})
export class MainComponent implements OnInit {

  constructor(private router:Router) { }

  prueba(){
    this.router.navigate(['./heroes']);
  }
  ngOnInit(): void {
  }

}
