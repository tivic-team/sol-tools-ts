
import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'alert-dialog',
    template: `
    <div fxLayout="column">
        <strong>{{ title }}</strong>
        <mat-divider *ngIf="icon" style="margin-top: 20px"></mat-divider>
        <div fxLayoutAlign="start center" fxLayoutGap="40px" [ngStyle]="{'min-height': icon ? '72px' : 'auto'}">
            <mat-icon *ngIf="icon" style="min-height: 48px; font-size: 3em !important; opacity: .5;">{{icon}}</mat-icon>
            <p fxFlex fxLayoutAlign="start center" [innerHTML]="message"></p>
        </div>
        <div fxLayout="row">
        <span fxFlex></span>
        <button type="button" color="primary" mat-raised-button (click)="callback || dialogRef.close()">OK</button>
        </div>
    </div>
    `
})
export class AlertDialog {

    public title: string;
    public message: string;
    public callback: Function;
    public icon: string;

    constructor(public dialogRef: MatDialogRef<AlertDialog>) {

    }
}