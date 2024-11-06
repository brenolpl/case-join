import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";

@Injectable({providedIn: 'root'})
export class FormResolver implements Resolve<Observable<any>>{

  constructor(private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let parts = state.url.split('/');
    let id = parts[parts.length-1];
    let resource = parts[parts.length-2];
    console.log(this);
    
    return this.httpService.getById(resource, parseInt(id));
  }



}