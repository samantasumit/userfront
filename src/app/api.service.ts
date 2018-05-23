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

    constructor(private http: HttpClient,
    private loaderService: LoaderService) {
        
    }

    getSocket() {
        this.socket = io(ENV.apiUrl);
        this.socket.emit('connection', { hello: 'connection estb' });
        this.socket.on('news', function (data) {
            console.log(data);
        });
        return this.socket;
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
