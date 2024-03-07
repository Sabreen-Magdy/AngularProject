import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/Models/iproduct';
import { AccountService } from 'src/app/services/account.service';
import { FakeApiProductsService } from 'src/app/services/fake-api-products.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

 productList:IProduct[]=[] ;
 constructor(private productservice:FakeApiProductsService ,private accServ:AccountService){}
  ngOnDestroy(): void {
     this.mySubscription?.unsubscribe();
  }
 mySubscription:Subscription|undefined;
 ngOnInit(): void {
  this.mySubscription =this.productservice.getAll().subscribe({
    next:(data)=>{this.productList=data}
  });
  }
  deleteProduct(i:number){
    this.productservice.delete(i).subscribe();
    this.productList = this.productList.filter(product => product.id !== i);
    return this.productList;
  }
  IsAdmin(){
   return this.accServ.isAdmin();
  }

}
