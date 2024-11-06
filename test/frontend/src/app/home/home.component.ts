import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private route: ActivatedRoute, private router: Router) {}

  public goToProdutos(): void {
    this.router.navigate(['/produtos'], {relativeTo: this.route});
  }

  public goToCategorias(): void {
    this.router.navigate(['/categorias'], {relativeTo: this.route});
  }

 }
