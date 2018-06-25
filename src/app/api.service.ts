import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { User } from './user.interface';
import { ENV } from './app.config';
import * as io from 'socket.io-client';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};



@Injectable()
export class ApiService {

    public socket;
    public socket2;

    constructor(private http: HttpClient,
    private loaderService: LoaderService) {
        
    }

    getSocket() {
        // this.socket = io(ENV.apiUrl);
        this.socket = io("http://127.0.0.1:8081");
        //this.socket = io("http://192.168.2.163:3000?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YTVlMGRjNzk4MTIyMTA3MjY0OWIzYjAiLCJ0aW1lc3RhbXAiOiIyMDE4LTA1LTIzVDEwOjAyOjU2LjMzNVoiLCJ1c2VyVHlwZSI6IkRvY3RvciIsImlhdCI6MTUyNzA2OTc3Nn0.rFiEX1M0bbnyTgkDmLXwR-EgG2JyEbWOAiplQpq6hrI");
        this.socket.on('data', function (data) {
            console.log(data);
        });
        return this.socket;
    }

    getSocket2() {
        this.socket2 = io("http://192.168.2.163:3000?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YWY5MjQxNTcwYTg1MTNlZWZhNDEzNGMiLCJ0aW1lc3RhbXAiOiIyMDE4LTA1LTE0VDA1OjUyOjIwLjU2NFoiLCJ1c2VyVHlwZSI6IkRvY3RvciIsImlhdCI6MTUyNjI3NzE0MX0.22U5d6meci2HLMujghj8CG5n215x1N5H0IGCCIRT3jY");
        this.socket2.on('data', function (data) {
            console.log(data);
        });
        return this.socket2;
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
