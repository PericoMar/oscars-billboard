import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, MatDialogModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private _matDialog : MatDialog){}
  abrirModalLogin():void{
    this._matDialog.open(LoginModalComponent, {
      width: '600px',
      height: '500px'
    });
  }
}
