import {Component, Input, OnInit} from '@angular/core';
import { dinodbServices } from "src/app/services/dinodb.services";
import { DinosaurData } from '../admin/main-page.component';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  dinosaurs: any;
  dinosaur : DinosaurData
  cantidad : Array<number>

  @Input()
    id: string;

  constructor(private dinoService: dinodbServices, private _activatedRoute: ActivatedRoute) {
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
    this.id=""
    this.cantidad = new Array<number>()
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.id = <string> params.get('id')
      console.log("PARAMETRO: " + params.get('id'))
    })
    this.getOneDino(this.id)
  }

  buy(){
    //Por implementar
  }

  getOneDino(id: string){
    this.dinoService.get(id).subscribe(
      data => {
        console.log("Visualizando dinosaurio con id:" +data)
        this.dinosaur = <DinosaurData> data;
        for(var i = 1; i < this.dinosaur.cantidad+1; i ++){
          this.cantidad.push(i)
        }
      },
      error => {
        console.error(error)
      }
    )
  }

}
