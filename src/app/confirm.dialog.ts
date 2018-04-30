
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from './api.service';

@Component({
    selector: 'confirm--dialog',
    templateUrl: 'confirm-dialog.html',
    styleUrls: ['./confirm.dialog.scss']
})

export class ConfirmDialog {

    constructor(private apiService: ApiService,
        private dialogRef: MatDialogRef<ConfirmDialog>,
        @Inject(MAT_DIALOG_DATA) public user: any) {
    }

    onNoClick() {
        this.dialogRef.close();
    }

    submit() {
        if (this.user && this.user._id) {
            this.apiService.removeUser({ userId: this.user._id })
                .subscribe((response: any) => {
                    this.dialogRef.close(true);
                }, (error) => {
                    console.log(error);
                });
        }
    }

}