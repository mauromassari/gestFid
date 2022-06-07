import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ChachingService } from './chaching.service';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptorService implements HttpInterceptor {

  constructor(private cacheService: ChachingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(req.method !== 'GET'){

      console.log(`Invalidiaimo la chache: ${req.method} ${req.url}`);

      this.cacheService.clearAll();
      return next.handle(req);
    }

    const cachedResponse: HttpResponse<any> = this.cacheService.getCache(req.url);

    if(cachedResponse){
      console.log(`Otteniamo i dati dalla chache: ${cachedResponse.url}`);
      console.log(cachedResponse);

      return of (cachedResponse);
    }

    return next.handle(req)
    .pipe(
      tap(event => {
        if(event instanceof HttpResponse){
          console.log(`Aggiungiamo i dati nella cache: ${req.url}`);
          this.cacheService.setCache(req.url, event, new Date());
        }}));
  }

}
