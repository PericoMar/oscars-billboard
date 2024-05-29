import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {
  registerForm!: FormGroup;
  errorMsg : string = "";
  confirmPasswordVisible: boolean = false;
  userExists: boolean = false;
  passwordsMismatch: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<RegisterModalComponent>, 
    private fb: FormBuilder,
    private _matDialog: MatDialog,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.userExists = false;
    this.passwordsMismatch = false;

    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        this.passwordsMismatch = true;
        this.errorMsg = "Las contraseñas no coinciden.";
        return;
      }

      this.authService.checkUserExists(email).subscribe(exists => {
        console.log(exists);
        if (exists.exists) {
          this.userExists = true;
          this.errorMsg = "Ya existe una cuenta con este correo."
        } else {
          const user = { email, password };
          this.authService.register(user).subscribe(response => {
            console.log('Usuario registrado:', response);
            this.userService.setUser(user);
            this.reloadPage();
            this.closeDialog();
          }, error => {
            console.error('Error al registrar usuario:', error);
          });
        }
      }, error => {
        console.error('Error al verificar usuario:', error);
      });
    }
  }

  closeAndOpenLoginModal(){
    this.dialogRef.close();
    this._matDialog.open(LoginModalComponent, {
      width: '660px',
      height: '500px'
    })
  }

  reloadPage(): void {
    window.location.reload();
  }
}
