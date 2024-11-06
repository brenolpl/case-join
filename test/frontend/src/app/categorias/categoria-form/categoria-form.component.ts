import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, first, of } from 'rxjs';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent implements OnInit {
  public formGroup: FormGroup;
  private categoria: any = {};

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private httpService: HttpService) {
    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.data.pipe(first()).subscribe(
      (next: any) => {
        this.categoria = next?.categoria;
        this.loadForm();
      }
    )
  }

  private loadForm(): void {
    if(this.categoria?.id) {
      this.formGroup.get('id')?.setValue(this.categoria.id);
      this.formGroup.get('nome')?.setValue(this.categoria.nome);
    }
  }

  public salvar(): void {
    if(!this.formGroup.valid) {
      alert('Formulário inválido');
      return;
    }

    const categoria = {
      id: this.categoria?.id,
      nome: this.formGroup.get('nome')?.value
    }

    if(categoria.id) {
      this.atualizarCategoria(categoria);
    } else {
      this.criarCategoria(categoria);
    }
    
  }

  public atualizarCategoria(categoria: any): void {
    this.httpService.put('categorias', categoria)
    .pipe(first(),
    catchError(err => {
      alert('Falha ao salvar');
      return of();
    })).subscribe(
      next => {
        alert('Salvo com sucesso');
      }
    )
  }

  public criarCategoria(categoria: any): void {
    this.httpService.post('categorias', categoria)
    .pipe(first(),
    catchError(err => {
      alert('Falha ao salvar');
      return of();
    })).subscribe(
      next => {
        if(next.id) {
          alert('Salvo com sucesso');
          this.router.navigate(['../', next.id], {relativeTo: this.route});
        }
      }
    )
  }
}
