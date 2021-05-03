import { Component, OnInit } from '@angular/core';
import { dinodbServices } from "src/app/services/dinodb.services";
import { DinosaurData } from '../admin/main-page.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  dinosaurs: any;
  dinosaur : DinosaurData


  constructor(private dinoService: dinodbServices) {
    this.dinosaur = {
      especie: "",
      tipo: "",
      habitat: "",
      altura: 0,
      peso: 0,
      vida: 0,
      cantidad: 0,
      precio: 0.00,
    };
   }

  ngOnInit(): void {
    this.getAllDinos()
  }

  getAllDinos(){
    this.dinoService.getAll().subscribe(
      data=>{
        this.dinosaurs = data;
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

  getOneDino(id: string){
    this.dinoService.get(id).subscribe(
      data => {
        console.log(data)
        
      },
      error => {
        console.error(error)
      }
    )
  }

}
