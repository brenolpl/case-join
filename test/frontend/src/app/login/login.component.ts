import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public usuario: string = '';
  public senha: string = '';

  constructor(private authService: AuthService) {}

  public registrar(): void {
    this.authService.registrar(this.usuario, this.senha);
  }

  public login(): void {
    this.authService.login(this.usuario, this.senha);
  }
}
