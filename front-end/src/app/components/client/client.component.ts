import {Component, Input, OnInit} from '@angular/core';
import { dinodbServices } from "src/app/services/dinodb.services";
import { DinosaurData, ShopData } from '../admin/main-page.component';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { MainPageComponent } from "../admin/main-page.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  dinosaurs: any;
  dinosaur : DinosaurData
  shop: ShopData
  numberOfDinos : Array<number>
  purchasedControl = new FormControl('', Validators.required);

  @Input()
    id: string;

  constructor(private dinoService: dinodbServices, private _activatedRoute: ActivatedRoute,
              private route: Router, public mainComponent: MainPageComponent,private _snackBar: MatSnackBar) {
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
    this.shop = {
      especie: "",
      tipo: "",
      habitat: "",
      altura: 0,
      peso: 0,
      vida: 0,
      cantidad: 0,
      precio: 0.00,
      originalID: ""
    };
    this.id=""
    this.numberOfDinos = new Array<number>()
  }


  displaySnackBar(message: string) {
    this._snackBar.open(message,'OK',{
      duration: 5000,
    });
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.id = <string> params.get('id')
      console.log("Dino id: " + params.get('id'))
    })
    this.getOneDino(this.id)
  }

  buy(dino: DinosaurData, numberOfDinos: number){
    //Creamos el objeto y lo añadimos a la base de datos
    this.setShopFromDino(dino);
    this.shop.cantidad = numberOfDinos;
    this.shop.originalID = this.id;

    this.create(this.shop);

    //Actualizamos el dinosaurio
    dino.cantidad = dino.cantidad - numberOfDinos;
    this.mainComponent.update(dino,this.id,"Dinosaurio añadido al carrito con éxito");
    this.goBack()
  }

  getOneDino(id: string){
    this.dinoService.get(id).subscribe(
      data => {
        console.log("Visualizando dinosaurio con id:" + id)
        this.dinosaur = <DinosaurData> data;
        for(var i = 1; i < this.dinosaur.cantidad+1; i ++){
          this.numberOfDinos.push(i)
        }
      },
      error => {
        console.error(error)
      }
    )
  }

  goBack(){
    this.route.navigate(['/client/'])
  }

  setShopFromDino(dino: DinosaurData){
    this.shop.especie = dino.especie;
    this.shop.tipo = dino.tipo;
    this.shop.habitat = dino.habitat;
    this.shop.altura = dino.altura;
    this.shop.peso = dino.peso;
    this.shop.vida = dino.vida;
    this.shop.precio = dino.precio
  }

  create(purchase: ShopData){
    this.dinoService.createPurchase(purchase)
      .subscribe(
        data=>{
          console.log(data)
        },
        error => {
          console.error(error)
        }
      )
  }

  update(purchase: ShopData, id: string){
    this.dinoService.updatePurchase(purchase,id)
      .subscribe(
        data => {
          console.log(data)
          this.ngOnInit();
        },
        error => {
          console.error(error)
        }
      )
  }


}
