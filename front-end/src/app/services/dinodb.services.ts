import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DinosaurData} from "../components/admin/main-page.component";
import {ShopData} from "../components/admin/main-page.component";

const baseUrl = 'http://localhost:8080/api/dino';
const baseUrlShop = 'http://localhost:8080/api/dino/shop';
const headers = new HttpHeaders()
  .append('Access-Control-Allow-Origin', '*');


@Injectable({
  providedIn: 'root'
})


export class dinodbServices {

  constructor(private http: HttpClient) { }

  //Dino requests
  getAll() {
    return this.http.get(baseUrl,{observe: 'body', responseType: 'json', headers});
  }

  get(id: string) {
    return this.http.get(`${baseUrl}/${id}`,{headers});
  }

  create(data: DinosaurData) {
    return this.http.post(baseUrl, data, {headers: {'Content-Type': 'application/json'}})
  }

  update(data: DinosaurData,  id:string) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  //Shop requests
  getAllPurchases(){
    return this.http.get(baseUrlShop+"/find",{observe: 'body', responseType: 'json', headers});
  }

  createPurchase(data: ShopData) {
    return this.http.post(baseUrlShop, data, {headers: {'Content-Type': 'application/json'}})
  }

  updatePurchase(data: ShopData,  id:string) {
    return this.http.put(`${baseUrlShop}/${id}`, data);
  }

  deletePurchase(id: string) {
    return this.http.delete(`${baseUrlShop}/${id}`);
  }

}
