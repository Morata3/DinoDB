import { Component, OnInit } from '@angular/core';
import { dinodbServices } from "src/app/services/dinodb.services";

@Component({
  selector: 'app-content',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.css']
})
export class ChartPageComponent implements OnInit {

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
