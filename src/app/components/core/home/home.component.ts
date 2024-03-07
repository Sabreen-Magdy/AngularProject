import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FakeApiProductsService } from 'src/app/services/fake-api-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
     constructor(private productsService:FakeApiProductsService){}
  ngOnDestroy(): void {
     this.myObservableTest?.unsubscribe();
  }
  myObservableTest:Subscription|undefined;
  ngOnInit(): void {
    this.myObservableTest = this.productsService.testObservable().subscribe({
      next:(data)=>{console.log(data)},
      error:(error)=>{console.log(error)},
      complete:()=>{}
    });
  }
}
