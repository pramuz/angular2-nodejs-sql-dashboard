import { Component } from '@angular/core';
import { HttpService } from './app.http.service';

@Component({
  selector: 'http-data',
  template: `
        <button (click)="onGetData()">GetData</button>
        <span>{{getdata}}</span>
        
  `,
  providers:[HttpService]
  
})
export class HttpComponent {
    getdata: string;
   

    constructor (private _httpService:HttpService){}
    onGetData(){
        this._httpService.getDataList()
            .subscribe(
                data => this.getdata = JSON.stringify(data),
                error => alert(error),
                () => console.log("Finished")
            );
    }
    


}
