import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { productList } from '../Models/productList';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products:IProduct[]|undefined;
  constructor(private accServ:AccountService) {
    this.products=productList;
  }
 getAll(){
  return this.products;
 }
 getById(id:number):IProduct | undefined{
  return this.products?.find(p=>p.id==id)
 }
 add(item:IProduct){
  if(this.accServ.isAdmin()){
    this.products?.push(item)
  }
 }
 delete(_id:number){
  if(this.accServ.isAdmin()){
    this.products = this.products?.filter(product => product.id !== _id);
    }
    return this.products;
    }
 edit(item: IProduct) {
  if(this.accServ.isAdmin()){
    this.products = this.products?.map(p => {
      if (p.id === item.id) {
          return {
              ...item
          };
      }
      return p;
  });}
}
}
