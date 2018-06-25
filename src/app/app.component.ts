import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './api.service';
import { LoaderService } from './loader.service';
import { ConfirmDialog } from './confirm.dialog';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css', './app.component.scss']
})
export class AppComponent {

    public socket;
    public socket2;
    public title = 'User App';
    public dialogSubscrition: Subscription;
    public users = [];
    public userForm: FormGroup;
    public findUserForm: FormGroup;
    public nameControl: AbstractControl;
    public ageControl: AbstractControl;
    public searchInputControl: AbstractControl;

    constructor(private apiService: ApiService,
        private loaderService: LoaderService,
        private fb: FormBuilder,
        private dialog: MatDialog) {
        this.userForm = this.fb.group({
            name: ['', Validators.required],
            age: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])]
        });
        this.findUserForm = this.fb.group({
            // searchInput: ['', Validators.required]
            searchInput: ['']
        });
        this.nameControl = this.userForm.controls['name'];
        this.ageControl = this.userForm.controls['age'];
        this.searchInputControl = this.findUserForm.controls['searchInput'];
    }

    ngOnInit() {
        this.socket = this.apiService.getSocket();
        this.socket2 = this.apiService.getSocket2();
        this.getUsers();
        this.searchInputControl.valueChanges.debounceTime(300)
            .subscribe((response) => {
                this.findUserInstant();
            })
    }

    getUsers() {
        this.loaderService.showLoader();
        this.apiService.getUsers()
            .subscribe((response: any) => {
                this.loaderService.hideLoader();
                this.users = response.users;
            }, (error) => {
                this.loaderService.hideLoader();
                console.log(error);
            });
    }

    findUserInstant() {
        let user = {
            searchInput: this.findUserForm.get('searchInput').value,
        };
        // this.loaderService.showLoader();
        this.apiService.findUser(user)
            .subscribe((response: any) => {
                this.loaderService.hideLoader();
                this.users = response.users;
            }, (error) => {
                this.loaderService.hideLoader();
                console.log(error);
            });
    }

    addUser() {
        this.socket.emit('connection', { user: 'User 1' });
        if (this.userForm.invalid) {
            return;
        }
        let user = {
            name: this.userForm.get('name').value,
            age: this.userForm.get('age').value
        };
        this.loaderService.showLoader();
        this.apiService.addUser(user)
            .subscribe((response: any) => {
                // this.nameControl.reset();
                // this.ageControl.reset();
                this.loaderService.hideLoader();
                this.getUsers();
            }, (error) => {
                this.loaderService.hideLoader();
                console.log(error);
            });
    }

    removeUser(user) {
        this.openDialog(user);
    }

    openDialog(user) {
        let dialogRef = this.dialog.open(ConfirmDialog, {
            data: user 
        });
        this.dialogSubscrition = dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getUsers();
            }
        });
    }

    ngOnDestroy() {
        if (this.dialogSubscrition) {
            this.dialogSubscrition.unsubscribe();
        }
    }

}
