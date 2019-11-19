import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {

  }

  public openSnackBar(message: string, duration: number = 2000) {
    this.snackBar.open(message, 'X', {
      verticalPosition: 'top',
      duration: 2000,
    });
  }

}
