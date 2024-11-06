import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, catchError, of } from 'rxjs';
import { HttpService } from '../service/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  public categorias$: Observable<any[]> = of([]);

  constructor(private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute) {}

  
  ngOnInit(): void {
      this.loadCategorias();
  }

  public loadCategorias = (): void => {
    this.categorias$ = this.httpService.get('categorias');
  }

  public goToNovaCategoria(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  public goToCategoria(id: number): void {
    this.router.navigate([id], {relativeTo: this.route});
  }

  public excluirCategoria(id: number): void {
    this.httpService.delete('categorias', id)
    .pipe(catchError(
      err => {
        alert('Não foi possível excluir');
        return of([]);
      }
    ))
    .subscribe(
      _ => {
        console.log(_);
        
        alert('Excluído com sucesso');
        this.loadCategorias();
      }
    )
  }
}
