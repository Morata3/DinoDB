import {Component, Input, OnInit} from '@angular/core';
import {DinosaurData} from "../admin/main-page.component";
import {dinodbServices} from "../../services/dinodb.services";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {

  dinosaur : DinosaurData;

  @Input()
    id: string;

  constructor(private dinoService: dinodbServices, private route: Router, private _activatedRoute: ActivatedRoute) {
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
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.id = <string> params.get('id')
      console.log("Dino id: " + params.get('id'))
    })
    this.getOneDino(this.id)
  }

  getOneDino(id: string){
    this.dinoService.get(id).subscribe(
      data => {
        console.log("DINO:" + data)
        this.dinosaur = <DinosaurData> data;
      },
      error => {
        console.error(error)
      }
    )
  }

  goBack(){
    this.route.navigate(['/admin/'])
  }

}
