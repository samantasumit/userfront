import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ApiService } from './api.service'
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialog } from './confirm.dialog'
import 'rxjs/add/operator/debounceTime';

@NgModule({
    declarations: [
        AppComponent,
        ConfirmDialog
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule
    ],
    providers: [
        ApiService
    ],
    entryComponents: [
        ConfirmDialog
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
