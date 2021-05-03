import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DinosaurData} from "../components/admin/main-page.component";

const baseUrl = 'http://localhost:8080/api/dino';

@Injectable({
  providedIn: 'root'
})


export class dinodbServices {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl,{observe: 'body', responseType: 'json'});
  }

  get(id: string) {
    return this.http.get(`${baseUrl}/${id}`);
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

}
