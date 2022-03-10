import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService 
{

  loadingSource = new BehaviorSubject<boolean>(false)
  loading = this.loadingSource.asObservable()
  
  errorMsgSource = new BehaviorSubject<string>('')
  errorMsg = this.errorMsgSource.asObservable()
  
  successMsgSource = new BehaviorSubject<string>('')
  successMsg = this.successMsgSource.asObservable()

  constructor()
  {
    this.errorMsg
      .subscribe(
        error =>
        {
          if(error)
            setTimeout(() => this.errorMsgSource.next(''), 5000)
        }
      )

      this.successMsg
      .subscribe(
        message =>
        {
          if(message)
            setTimeout(() => this.successMsgSource.next(''), 5000)
        }
      )
  }
  
}
