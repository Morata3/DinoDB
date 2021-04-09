import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/dino';

@Injectable({
  providedIn: 'root'
})
export class dinodbServices {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id: string) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: json) {
    return this.http.post(baseUrl, data);
  }

/*  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }


  findBySpecies(title) {
    return this.http.get(`${baseUrl}?title=${title}`);
  }*/
}
