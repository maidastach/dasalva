import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { LoadingService } from 'src/app/Services/Loading/loading.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    return next.handle(request)
      .pipe(
        map(
          (res: HttpEvent<any>) =>
          {
            if(res instanceof HttpResponse && res.body && res.body.message)
              this.loadingService.successMsgSource.next(res.body.message)
            return res
          }
        ),
        catchError(
          (error: HttpErrorResponse) =>
          {
            this.loadingService.errorMsgSource.next(error.error.message || error.message)
            return throwError(() => new Error(error.error.message || error.message))
          }
        )
      );
  }
}
