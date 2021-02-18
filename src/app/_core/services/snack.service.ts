import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarRef } from '@angular/material/snack-bar/snack-bar-ref';
import { TextOnlySnackBar } from '@angular/material/snack-bar/simple-snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar/snack-bar-config';

@Injectable({providedIn: 'root'})
export class SnackService {

  constructor(private snack: MatSnackBar) {
  }

  public open(message: string, action: string, config: MatSnackBarConfig = {}): MatSnackBarRef<TextOnlySnackBar> {
    return this.snack.open(message, action, config);
  }

  public close(): void {
    this.snack.dismiss();
  }

}
