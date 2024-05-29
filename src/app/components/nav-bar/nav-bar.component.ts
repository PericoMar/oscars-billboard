import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, MatDialogModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  user! : any;

  constructor(
    private _matDialog : MatDialog,
    private userService : UserService
  ){}

  ngOnInit(){
    this.user = this.userService.getUser();
  }

  abrirModalLogin():void{
    this._matDialog.open(LoginModalComponent, {
      width: '500px',
      height: '500px'
    });
  }

  abrirModalRegister(): void{
    this._matDialog.open(RegisterModalComponent, {
      width: '600px',
      height: '600px'
    })
  }

  logout(){
    this.userService.clearUser();
    this.reloadPage()
  }

  reloadPage(): void {
    window.location.reload();
  }
}
