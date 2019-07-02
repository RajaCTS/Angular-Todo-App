import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'
import { Injectable } from '@angular/core';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private route: Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var cloneReq;
        if (req.url.search("newUser") >= 0 || req.url.search("login") >= 0) {
            cloneReq = req;
        } else {
            if (window.sessionStorage.getItem('Authorization')) {
                cloneReq = req.clone({ headers: req.headers.set('Authorization', window.sessionStorage.getItem('Authorization')) });
            } else {
                cloneReq = req;
            }
        }
        return next.handle(cloneReq).pipe(tap((data)=>{
                console.log(data);
        },(err)=>{
            this.route.navigate(['/userLogin']);
        }))
    }
}