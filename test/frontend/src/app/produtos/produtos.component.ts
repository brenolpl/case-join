import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Observable, catchError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit{
  public produtos$: Observable<any[]> = of([]);


  constructor(private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadProdutos();   
  }

  private loadProdutos = (): void => {
    this.produtos$ = this.httpService.get('produtos');
  }

  public goToNovoProduto(): void {
      this.router.navigate(['new'], {relativeTo: this.route});
  }

  public goToProduto(id: number) {
    this.router.navigate([id], {relativeTo: this.route});
  }

  public excluirProduto(id: number) {
    this.httpService.delete('produtos', id)
    .pipe(catchError(
      err => {
        alert('Erro ao excluir');
        return of([]);
      }
    ))
    .subscribe(
      next => {
        this.loadProdutos();
        alert('Excluído com sucesso');
      }
    )
  }

  
}
