import { MatDialogRef } from "@angular/material/dialog";
import { Component } from "@angular/core";

@Component({
    selector: 'confirm-dialog',
    template: `
        <div fxLayout="column">
            <strong>{{ title }}</strong>
            <p>{{ message }}</p>
            <div fxLayout="row" fxLayoutGap="10px">
                <span fxFlex></span>
                <button type="button" color="accent" mat-button (click)="cancelCallback ? cancelCallback() : dialogRef.close()">
                    {{cancelLabel}}
                </button>
                <button type="button" color="primary" mat-raised-button (click)="okCallback ? okCallback() : dialogRef.close(true)">
                    {{okLabel}}
                </button>
            </div>
        </div>
    `
})
export class ConfirmDialog {

    public title: string;
    public message: string;
    public okLabel: string = 'OK';
    public cancelLabel: string = 'Cancelar';
    public okCallback: Function;
    public cancelCallback: Function;

    constructor(public dialogRef: MatDialogRef<ConfirmDialog>) {

    }
}