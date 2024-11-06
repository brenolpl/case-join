import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { AuthGuard } from './guards/auth-guard';
import { ProdutosFormComponent } from './produtos/produtos-form/produtos-form.component';
import { FormResolver } from './service/form-resolver';
import { CategoriaFormComponent } from './categorias/categoria-form/categoria-form.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'produtos', children: [
        {path: '', component: ProdutosComponent, canActivate: [AuthGuard]},
        {path: 'new', component: ProdutosFormComponent, canActivate: [AuthGuard]},
        {path: ':id', component: ProdutosFormComponent, resolve: {produto: FormResolver}, canActivate: [AuthGuard]}
    ]},
    { path: 'categorias', children: [
        {path: '', component: CategoriasComponent, canActivate: [AuthGuard]},
        {path: 'new', component: CategoriaFormComponent, canActivate: [AuthGuard]},
        {path: ':id', component: CategoriaFormComponent, resolve: {categoria: FormResolver}, canActivate: [AuthGuard]}
    ]},
];
