import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading = this._loading.asObservable();
  count = 0;
   
  constructor() { }

  show(){
    this.count++;
    this._loading.next(true);
  }

  hide(){
    if(this.count>0){
      this.count--;
    }if(this.count==0){
      this._loading.next(false);
    }

    
  }

}

