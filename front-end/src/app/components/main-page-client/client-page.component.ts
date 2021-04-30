import { Component, OnInit } from '@angular/core';
import { dinodbServices } from "src/app/services/dinodb.services";
import {MatFormFieldModule} from '@angular/material/form-field'; 
@Component({
  selector: 'app-content',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {

  dinosaurs: any;

  constructor(private dinoService: dinodbServices) { }

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

}
