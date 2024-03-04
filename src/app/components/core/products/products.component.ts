import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

 productList:IProduct[]=[] ;
 constructor(private productservice:ProductService){}
 ngOnInit(): void {
  this.productList=this.productservice.getAll() as IProduct[];
  }
  deleteProduct(i:number){
    console.log(i);
    this.productservice.delete(i);
    this.productList = this.productList.filter(product => product.id !== i);
    return this.productList;
  }
}
