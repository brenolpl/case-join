import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { Observable, catchError, first, of } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produtos-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, AsyncPipe],
  templateUrl: './produtos-form.component.html',
  styleUrl: './produtos-form.component.css'
})
export class ProdutosFormComponent implements OnInit {
  public formGroup: FormGroup;
  public categorias$: Observable<any[]> = of([]);
  private produto: any = {};

  constructor(private formBuilder: FormBuilder,
              private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute) {
      this.formGroup = formBuilder.group({
        id: [null],
        nome: ['', [Validators.minLength(2), Validators.required]],
        descricao: [''],
        precoCompra: [0, Validators.required],
        precoVenda: [0, Validators.required],
        estoque: [0, Validators.required],
        categoriaId: [null, Validators.required]
      });
  }

  ngOnInit(): void {
      this.categorias$ = this.httpService.get('categorias');
      this.route.data.pipe(first()).subscribe(
        (next: any) => {
          this.produto = next?.produto;
          this.loadForm();
        }
      )
  }

  private loadForm(): void {
    if(this.produto?.id) {
      this.formGroup.get('id')?.setValue(this.produto.id),
      this.formGroup.get('nome')?.setValue(this.produto.nome);
      this.formGroup.get('descricao')?.setValue(this.produto.descricao);
      this.formGroup.get('precoCompra')?.setValue(this.produto.precoCompra);
      this.formGroup.get('precoVenda')?.setValue(this.produto.precoVenda);
      this.formGroup.get('estoque')?.setValue(this.produto.estoque);
      this.formGroup.get('categoriaId')?.setValue(this.produto.categoria.id);
    }
  }

  public salvar(): void {
    if(!this.formGroup.valid) {
      alert('Formulário inválido');
      return;
    }

    const produto = this.getProduto();

    if(produto.id) {
      this.atualizarProduto(produto);
    } else {
      this.criarProduto(produto);
    }
  }

  private getProduto(): any {
    return {
      id: this.formGroup.get('id')?.value,
      nome: this.formGroup.get('nome')?.value,
      descricao: this.formGroup.get('descricao')?.value,
      precoCompra: this.formGroup.get('precoCompra')?.value,
      precoVenda: this.formGroup.get('precoVenda')?.value,
      estoque: this.formGroup.get('estoque')?.value,
      categoria: {id: this.formGroup.get('categoriaId')?.value}
    }
  }

  public atualizarProduto(produto: any): void {
    this.httpService.put('produtos', produto).pipe(first(), 
    catchError(
      err => {
        alert('Erro ao salvar '.concat(err));
        return of([]);
      }
    )).subscribe(
      next => {
        alert('Salvo com sucesso!');
      }
    );
  }

  public criarProduto(produto: any): void {
    this.httpService.post('produtos', produto).pipe(first(),
    catchError(
      err => {
        alert('Erro ao salvar '.concat(err));
        return of([]);
      }
    )).subscribe(
      next => {
        if(next?.id) {  
          alert('Salvo com sucesso');
          this.formGroup.get('id')?.setValue(next.id);
          this.router.navigate(['../', next.id], {relativeTo: this.route});
        }
      }
    )
  }

}
