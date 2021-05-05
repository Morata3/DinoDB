import {Component, Inject, OnInit} from '@angular/core';
import { dinodbServices } from "src/app/services/dinodb.services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

export interface DinosaurData {
  especie: string,
  tipo: string,
  habitat: string,
  altura: number,
  peso: number,
  vida: number,
  cantidad: number,
  precio: number
}

export interface ShopData {
  especie: string,
  tipo: string,
  habitat: string,
  altura: number,
  peso: number,
  vida: number,
  cantidad: number,
  precio: number,
  originalID: string
}

@Component({
  selector: 'app-content',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  dinosaurList : any;
  dinosaur : DinosaurData;

  constructor(private dinoService: dinodbServices,
      public dialog: MatDialog,private _snackBar:MatSnackBar, private route: Router)
  {
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
  displaySnackBar(message: string) {
    this._snackBar.open(message,'OK',{
      duration: 5000,
    });
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.dinoService.getAll()
      .subscribe(
        data => {
          this.dinosaurList = data;
          console.log(data)
        },
        error => {
          console.error(error)
        }
      )
  }

  create(dino: DinosaurData){
    this.dinoService.create(dino)
      .subscribe(
        data=>{
          console.log(data)
          this.ngOnInit();
          this.displaySnackBar("Dinosaurio añadido con éxito")
        },
        error => {
          console.error(error)
        }
      )
  }

  update(dino: DinosaurData, id: string,mensaje:string){
    this.dinoService.update(dino,id)
      .subscribe(
        data => {
          console.log(data)
          this.ngOnInit();
          this.displaySnackBar(mensaje)
        },
        error => {
          console.error(error)
        }
      )
  }

  delete(id: string) {
    this.dinoService.delete(id)
      .subscribe(
        data => {
          console.log(data)
          this.ngOnInit();
          this.displaySnackBar("Dinosaurio eliminado con éxito")
        },
        error => {
          console.error(error)
        }
      )
  }

  openDialogCreate(): void {
    const dialogCreate = this.dialog.open(DialogCreate, {
      width: '250px',
      data: {
        especie: this.dinosaur.especie, tipo: this.dinosaur.tipo, habitat: this.dinosaur.habitat, altura: this.dinosaur.altura,
        peso: this.dinosaur.peso, vida: this.dinosaur.vida, cantidad: this.dinosaur.cantidad, precio: this.dinosaur.precio
      }
    });

    dialogCreate.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result)
        this.create(result)
      else console.log("Dialog empty")
    });
  }

  openDialogEdit(dino: DinosaurData, dinoId: string): void{
    const dialogUpdate = this.dialog.open(DialogCreate, {
      width: '250px',
      data: {
        especie: dino.especie, tipo: dino.tipo, habitat: dino.habitat, altura: dino.altura,
        peso: dino.peso, vida: dino.vida, cantidad: dino.cantidad, precio: dino.precio
      }
    });

    dialogUpdate.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result)
        this.update(result, dinoId,"Dinosaurio actualizado con éxito")
      else console.log("Dialog empty")
    });
  }

  goDinoDetail(id: string){
    this.route.navigate(['/admin/dino/' + id]).then(r => {
      console.log("Visualizando dino con id:" + id)
    });
  }

}

@Component({
  selector: 'dialog-create',
  templateUrl: 'dialog-create-update.html'
})
export class DialogCreate {

  constructor(public dialogRef: MatDialogRef<DialogCreate>,
              @Inject(MAT_DIALOG_DATA) public data: DinosaurData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

