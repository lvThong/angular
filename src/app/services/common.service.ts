import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    productInfo = {};

    constructor() { }
 
     buildQueryString(params: any) {
        if (!params) {
            return ;
        }
        let resultString ='?';
        const keys = Object.keys(params);
         let count = 0;
        for (let key of keys) {
            if (params[key]) {
                if (count < 1) {
                    resultString = resultString + `${key}=${params[key]}`;
            
                   } else{
                    resultString = resultString +`&${key}=${params[key]}`;
                   }
                   count++;      
            }
          
        }
        return resultString;
    
    }

}