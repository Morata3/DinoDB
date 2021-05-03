import { Component, OnInit } from '@angular/core';
import { ShopData } from "../admin/main-page.component";
import { dinodbServices } from "../../services/dinodb.services";

@Component({
  selector: 'app-content',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.css']
})
export class ChartPageComponent implements OnInit {

  shopList : any

  constructor(private dinoService: dinodbServices) { }

  ngOnInit(): void {
    this.getAll()
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
          this.refresh()
        },
        error => {
          console.error(error)
        }
      )
  }

  delete(id: string) {
    // this.dinoService.update()
    this.dinoService.deletePurchase(id)
      .subscribe(
        data => {
          console.log(data)
          this.refresh()
        },
        error => {
          console.error(error)
        }
      )
  }

  refresh(): void {
    this.getAll()
    window.location.reload();
  }

}
