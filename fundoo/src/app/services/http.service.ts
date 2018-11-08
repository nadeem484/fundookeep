import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  URL="http://34.213.106.173/api"
  constructor(private http:HttpClient) { }

  getData(val1){
    return this.http.get(this.URL+"/"+val1);
  }


  getnotesdata(address,token){
    var httpheaders = {
    headers:new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    })
  };
    return this.http.get(this.URL+"/"+address,httpheaders)
  }
  
  postData(val2,body){
    console.log(val2, body);
    return this.http.post(this.URL+"/"+val2,body)
  }
  
  postPassword(address,body,token)
  {
    console.log(token);
    console.log(body);
  
    var httpAuthOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })

    };

    return this.http.post(this.URL+"/"+address,this.getFormUrlEncoded(body),httpAuthOptions1)
  }
  
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
   }

   AddNotes(address,body,token)
   {
     console.log(token);
     console.log(body);
   
     var httpAuthOptions1 = {
       headers: new HttpHeaders({
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': token
       })
     };
 
     return this.http.post(this.URL+"/"+address,this.getFormUrlEncoded(body),httpAuthOptions1)
   }
  

   logoutpostData(address,token){
    var httpheaders = {
      headers:new HttpHeaders({
        'content-Type' : 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    return this.http.post(this.URL+"/"+address,null,httpheaders)

  }


  notesDelete(address,body,token)
  {
    var httpheaders = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })

    };

    return this.http.post(this.URL+"/"+address, body, httpheaders)
  }

  notesArchive(address,body,token)
  {
    var httpheaders = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })

    };

    return this.http.post(this.URL+"/"+address, body, httpheaders)
  }

  setColor(address,body,token)
  {
    var httpheaders = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })

    };

    return this.http.post(this.URL+"/"+address, body, httpheaders)
  }


  updateNotes(address,body,token)
  {
    var httpheaders = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })

    };

    return this.http.post(this.URL+"/"+address, body, httpheaders)
  }

  // Addlabel(address,body,token)
  // {
  //   var httpheaders = {
  //     headers: new HttpHeaders({
  //       'content-Type': 'application/json',
  //       'Authorization': token
  //     })

  //   };

  //   return this.http.post(this.URL+"/"+address, body, httpheaders)
  // }

  labelAddpostData(address,body,token)
  {
    var httpheaders = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })

    };

    return this.http.post(this.URL+"/"+address, body, httpheaders)
  }
  


  deleteDate(path){
    return this.http.delete(this.URL+"/"+path)
  }

}