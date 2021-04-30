import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list'; 
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

  create(data: string) {
    return this.http.post(baseUrl, data);
  }

 update(id:string, data:string) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id:string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }


  findBySpecies(title:string) {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
  
}
