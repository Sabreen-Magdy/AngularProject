import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { productList } from '../Models/productList';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products:IProduct[]|undefined;
  constructor() {
    this.products=productList;
  }
 getAll(){
  return this.products;
 }
 getById(id:number):IProduct | undefined{
  return this.products?.find(p=>p.id==id)
 }
 add(item:IProduct){
   this.products?.push(item)
 }
 delete(_id:number){
    this.products = this.products?.filter(product => product.id !== _id);
    return this.products;
    }
 edit(item: IProduct) {
  this.products = this.products?.map(p => {
      if (p.id === item.id) {
          return {
              ...item
          };
      }
      return p;
  });
}
}
