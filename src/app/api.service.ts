import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from './user.interface';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) {

    }

    getUsers() {
        return this.http.get("http://localhost:8081/listUsers", httpOptions);
    }

    findUser(payload) {
        return this.http.post("http://localhost:8081/findUsers", payload, httpOptions);
    }

    addUser(payload) {
        return this.http.post("http://localhost:8081/addUser", payload, httpOptions);
    }

}
