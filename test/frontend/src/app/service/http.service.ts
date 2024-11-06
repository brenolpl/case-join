import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class HttpService {

    constructor(private http: HttpClient){}

    public getById(resource: string, id: number): Observable<any> {
        return this.http.get(`/api/${resource}/${id}`, this.getOptions());
    }

    public get(resource: string): Observable<any> {
        return this.http.get(`/api/${resource}`, this.getOptions());
    }

    public post(resource: string, body: any): Observable<any> {
        return this.http.post(`/api/${resource}`, body, this.getOptions());
    }

    public put(resource: string, body: any): Observable<any> {
        return this.http.put(`/api/${resource}`, body, this.getOptions());
    }

    public delete(resource: string, id: number): Observable<any> {
        return this.http.delete(`/api/${resource}/${id}`, this.getOptions());
    }

    private getOptions() {
        return {
          headers: new HttpHeaders()
            .set('Authorization', '' + localStorage.getItem('access_token'))
        }
      }
}