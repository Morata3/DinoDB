import { Component, OnInit } from '@angular/core';
import { dinodbServices } from "src/app/services/dinodb.services";
import {Router} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {

  dinosaurs: any;

  constructor(private dinoService: dinodbServices, private route:Router) { }

  ngOnInit(): void {
    this.getAllDinos()
  }

  getAllDinos(){
    this.dinoService.getAll()
      .subscribe(
        data => {
          this.dinosaurs = data;
          console.log(data)
        },
        error => {
          console.log(error)
        }
      )
  }

  goBuy(id: string){
    this.route.navigate(['/client/aux/'+id]).then(r => {
      console.log("Compradno dino con id:" + id)
    });
  }

}
