import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class FakeApiProductsService {
  baseUrl:string="http://localhost:3002/products";
  constructor(private http:HttpClient) { }
  getAll():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.baseUrl);
   }
   getById(id:number):Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`http://localhost:3002/products/?id=${id}`);
   }
   add(product:IProduct){
      return this.http.post(this.baseUrl,product);
   }
   delete(id:number){
    return this.http.delete(`http://localhost:3002/products/${id}`);
      }
   edit(id:number , product:IProduct) {
    return this.http.put(`http://localhost:3002/products/${id}`,product);
  }
  testObservable():Observable<string>{
    console.log("observable before called.")
    let myObservable=new Observable<string>((observer)=>{
      console.log("observable after called.")
      observer.next("first data");
      observer.next("second data");
      if(false){
        observer.error();
      }
      observer.complete();
      return{
        unsubscribe() {
          console.log("end of subscripe");
        },
      }
    });
    return myObservable;
  }
}
