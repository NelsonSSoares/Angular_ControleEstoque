import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/get-all-products-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
// o Sinal de $ no final do nome da variável é uma convenção para indicar que a variável é um Observable
  public productsDataEmitter$ = new BehaviorSubject<Array<GetAllProductsResponse> | null >(null)
  public productsDatas: Array<GetAllProductsResponse> = [];

  setProductsDatas(productsDatas: Array<GetAllProductsResponse>): void{

    if(productsDatas){
      this.productsDataEmitter$.next(productsDatas);
      this.getProductsDatas();
    }

  }

  getProductsDatas(){
    this.productsDataEmitter$
    .pipe(
      take(1), //quantidade de chamadas que o observable vai fazer e depois se desinscrever
      map((data)=> data?.filter((product)=> product.amount > 0))
    )
    .subscribe({
      next: (response)=>{
       if(response){
        this.productsDatas = response
       }
      }
    });
    return this.productsDatas;
  }
}
