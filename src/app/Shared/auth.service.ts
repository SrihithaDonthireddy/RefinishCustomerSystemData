import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders}from '@angular/common/http'
import { TokenParams} from './TokenParams';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AccessToken:string='';
  constructor(private http:HttpClient) { }

  private TokenAPI = 'http://v-use-axcapi1d.axaltacs.net/Token';
  private  DataAPI ='http://v-use-axcapi1d.axaltacs.net/GetCustomerSystemExtracts';
  private  UpdateAPI='http://v-use-axcapi1d.axaltacs.net/UpdateCustomerSystemExtracts';

  private GetDevelopmentAPI = 'http://v-use-axcapi1d.axaltacs.net/api/GatekeeperToolbox/GetDevelopmentTypeList';

  login(userData:any):Observable<TokenParams>{
  var headersForTokenAPI = new HttpHeaders({'content-type': 'application/x-www-form-urlencoded'});
  var httpoptions= {headers : headersForTokenAPI};
  var body = `username=${userData.username}&password=${userData.password}&grant_type=password`;
  return this.http.post<any>(this.TokenAPI,body, httpoptions);
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getData(customer:any):Observable<any>{
  var reqheaders = new HttpHeaders({
    'content-type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'AxcsDb':'6GMerged',
    'AxcsCulture':'en',
    'UserContextID':'d9d79e5e-4c18-4c9f-8ab9-a1f0b9a096cf'
  });
  console.log(customer);
    return this.http.get(this.DataAPI + '?cstmrId=' + customer, { headers : reqheaders });
   
  }

  getDevelopmentTypeList():Observable<any>{
    var reqheaders = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'AxcsDb':'6GMerged',
      'AxcsCulture':'en',
      'UserContextID':'d9d79e5e-4c18-4c9f-8ab9-a1f0b9a096cf'
    });
    return this.http.get(this.GetDevelopmentAPI,{headers:reqheaders});
  }

 
// deleteData(id:any): Observable<any> {
//   var reqheaders = new HttpHeaders({
//     'content-type': 'application/json',
//     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//     'AxcsDb':'6GMerged',
//     'AxcsCulture':'en',
//     'UserContextID':'d9d79e5e-4c18-4c9f-8ab9-a1f0b9a096cf'
//   });
//   const url = `${this.DataAPI}/${id}`; 
//   return this.http.delete(url,{ headers : reqheaders })
// }
updateData(updatedResult:any): Observable<any> {
  var reqheaders = new HttpHeaders({
         'content-type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('token')}`,
         'AxcsDb':'6GMerged',
         'AxcsCulture':'en',
         'UserContextID':'d9d79e5e-4c18-4c9f-8ab9-a1f0b9a096cf'
       });
  return this.http.put(this.UpdateAPI, updatedResult, { headers : reqheaders })
}
  
}
