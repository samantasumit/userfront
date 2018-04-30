import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from './user.interface';
import { ENV } from './app.config'

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
        let url = ENV.apiUrl + '/listUsers';
        return this.http.get(url, httpOptions);
    }

    findUser(payload) {
        let url = ENV.apiUrl + '/findUsers';
        return this.http.post(url, payload, httpOptions);
    }

    removeUser(payload) {
        let url = ENV.apiUrl + '/removeUser';
        return this.http.put(url, payload, httpOptions);
    }

    addUser(payload) {
        let url = ENV.apiUrl + '/addUser';
        return this.http.post(url, payload, httpOptions);
    }

}
