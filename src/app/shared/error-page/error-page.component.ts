import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styles: [
    `
    a{
      font-size:2rem;
      color:gray;
     
    }
    li{
      padding:3rem;
    }

    h1{
      font-size:5rem;
    }
    `
  ]
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
