import { Component, OnInit } from '@angular/core';
import { ShopData, DinosaurData } from "../admin/main-page.component";
import { dinodbServices } from "../../services/dinodb.services";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.css']
})
export class ChartPageComponent implements OnInit {

  shopList : any
  dinosaur : DinosaurData

  constructor(private dinoService: dinodbServices, private _snackBar: MatSnackBar,
              private route: Router) {
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
    this.getAll()
  }

  displaySnackBar(message: string) {
    this._snackBar.open(message,'OK',{
      duration: 5000,
    });
  }

  getAll(){
    this.dinoService.getAllPurchases()
      .subscribe(
        data => {
          this.shopList = data;
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

  delete(id: string, shop: ShopData) {
    this.fromShopToDino(shop)

    this.dinoService.deletePurchase(id)
      .subscribe(
        data => {
          console.log(data)
        },
        error => {
          console.error(error)
        }
      )
  }

  fromShopToDino(shop: ShopData){
    this.dinoService.get(shop.originalID)
      .subscribe(
        data => {
          this.dinosaur = <DinosaurData> data;
          this.dinosaur.cantidad = this.dinosaur.cantidad + shop.cantidad
          this.dinoService.update(this.dinosaur, shop.originalID)
            .subscribe(
              data => {
                console.log(data)
                this.ngOnInit();
                this.displaySnackBar("Artículo eliminado con éxito")
              },
              error => {
                console.error(error)
              }
            )
        },
        error => {
          console.error("In chart page " + error)
        }
      )

  }

  goMarket(){
    this.route.navigate(['/client/'])
  }

}
