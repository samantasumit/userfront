
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from './api.service';
import { LoaderService } from './loader.service';

@Component({
    selector: 'confirm--dialog',
    templateUrl: 'confirm-dialog.html',
    styleUrls: ['./confirm.dialog.scss']
})

export class ConfirmDialog {

    constructor(private apiService: ApiService,
        private loaderService: LoaderService,
        private dialogRef: MatDialogRef<ConfirmDialog>,
        @Inject(MAT_DIALOG_DATA) public user: any) {
    }

    onNoClick() {
        this.dialogRef.close();
    }

    submit() {
        if (this.user && this.user._id) {
            this.loaderService.showLoader();
            this.apiService.removeUser({ userId: this.user._id })
                .subscribe((response: any) => {
                    this.loaderService.hideLoader();
                    this.dialogRef.close(true);
                }, (error) => {
                    this.loaderService.showLoader();
                    console.log(error);
                });
        }
    }

}