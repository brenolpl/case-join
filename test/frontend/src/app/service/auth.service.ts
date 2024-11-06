import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, first, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient, private router: Router){}

    public isTokenValid(): Observable<boolean> {
        return this.http.get<boolean>('/api/security/is-valid', 
        {
            headers: new HttpHeaders()
            .set('Authorization', '' + localStorage.getItem('access_token'))
        }).pipe(
            first())
    }

    public registrar(login: string, senha: string): void {
        this.http.post(`/api/security/registrar`, {
            login,
            senha
        }).subscribe(
            (response: any) => {
                localStorage.setItem('access_token', response.access_token as string);
                this.router.navigate(['/home']);
            }
        )
    }

    public login(login: string, senha: string): void {
        this.http.post(`/api/security/auth`, null, {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded'),
              params: {
                login: login,
                senha: senha
            }
          }).subscribe(
            (response: any) => {
                localStorage.setItem('access_token', response.access_token as string);
                this.router.navigate(['/home']);
            }
        )
    }
 }