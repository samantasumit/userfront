import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './api.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css', './app.component.scss']
})
export class AppComponent {

    public title = 'User App';
    public users = [];
    public userForm: FormGroup;
    public findUserForm: FormGroup;

    constructor(private apiService: ApiService,
        private fb: FormBuilder) {
        this.userForm = this.fb.group({
            name: ['', Validators.required],
            age: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])]
        });
        this.findUserForm = this.fb.group({
            name: ['', Validators.required]
        });
    }

    getUsers() {
        this.apiService.getUsers()
            .subscribe((response: any) => {
                this.users = response.users;
            }, (error) => {
                console.log(error);
            });
    }

    findUser() {
        if (this.findUserForm.invalid) {
            return;
        }
        let user = {
            name: this.findUserForm.get('name').value,
        };
        this.apiService.findUser(user)
            .subscribe((response: any) => {
                this.users = response.users;
            }, (error) => {
                console.log(error);
            });
    }

    addUser() {
        if (this.userForm.invalid) {
            return;
        }
        let user = {
            name: this.userForm.get('name').value,
            age: this.userForm.get('age').value
        };
        this.apiService.addUser(user)
            .subscribe((response: any) => {
                this.getUsers();
            }, (error) => {
                console.log(error);
            });
    }

}
