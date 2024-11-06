import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router){}

  public isLogin = (): boolean => this.router.url === '/login';

  public sair = (): void => {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
