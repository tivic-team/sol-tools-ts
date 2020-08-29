import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { ConfirmDialog } from './confirm-dialog';
import { AlertDialog } from './alert-dialog';

@Injectable()
export class DialogFactory {

    public static TOASTY_SUCCESS = 1;
    public static TOASTY_ERROR = 2;
    public static TOASTY_INFO = 3;
    public static TOASTY_WARNING = 4;

    public static SNACK_SUCCESS = 'success';
    public static SNACK_ERROR = 'error';
    public static SNACK_INFO = 'info';
    public static SNACK_WARNING = 'warning';
    public static SNACK_NONE = 'none';

    constructor(
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar,
    ){}

    public confirm(title: string, message: string, okLabel?:any, cancelLabel?:any): Observable<boolean> {
        let dialogRef: MatDialogRef<ConfirmDialog>;
        dialogRef = this._dialog.open(ConfirmDialog);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        if (okLabel) {
            dialogRef.componentInstance.okLabel = okLabel;
        }

        if (cancelLabel) {
            dialogRef.componentInstance.cancelLabel = cancelLabel;
        }

        return dialogRef.afterClosed();
    }

    public alert(title: string, message: string, icon?:any): Observable<boolean> {
        let dialogRef: MatDialogRef<AlertDialog>;

        dialogRef = this._dialog.open(AlertDialog);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.icon = icon;

        return dialogRef.afterClosed();
    }

    public snackBar(title: string, message: string, type: number) {
        let typePrefix = DialogFactory.SNACK_NONE;
        switch(type) {
            case DialogFactory.TOASTY_INFO: {
                typePrefix = DialogFactory.SNACK_INFO;
                break;
            }
            case DialogFactory.TOASTY_SUCCESS: {
                typePrefix = DialogFactory.SNACK_SUCCESS;
                break;
            }
            case DialogFactory.TOASTY_WARNING: {
                typePrefix = DialogFactory.SNACK_WARNING;
                break;
            }
            case DialogFactory.TOASTY_ERROR: {
                typePrefix = DialogFactory.SNACK_ERROR;
                break;
            }
            default: {
                typePrefix = DialogFactory.SNACK_NONE;
                break;
            }
        }

        this._snackBar.open(message, title, {
          duration: 3000,
          panelClass: [typePrefix+"-snackbar"]
        });
    }

    public snack(message: string, action: string = 'OK', type:string = DialogFactory.SNACK_NONE, options: MatSnackBarConfig = {}) {
        options.panelClass = [type+"-snackbar"];
        options.duration = options.duration || 3000;
        this._snackBar.open(message, action, options);
    }
}
