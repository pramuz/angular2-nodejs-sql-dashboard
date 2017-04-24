import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/first';
import {Observable} from "rxjs/Rx"
@Injectable()
export class HttpService {
   
    constructor (private _http:Http){}
    getDataList(){
        
        return this._http.get("http://localhost:4442/app")
            .map(res => res.json())
    }
    getPostdataList(dataget){
            console.log(dataget)
        var params = dataget;
        var headers =new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:4442/app/person',params,{
            headers:headers
        })
      
        .map(res =>res.json())
          .share();
    }
    getDataDel(id){
        
        return this._http.get("http://localhost:4442/app/"+id)
            .map(res => res.json())
    }
}