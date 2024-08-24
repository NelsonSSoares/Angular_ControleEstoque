import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/get-all-products-response';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnInit, OnDestroy {

  public productsList: Array<GetAllProductsResponse> = [];

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    private productDtService: ProductsDataTransferService
  ) { }

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void{
    this.productService.getAllProducts()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response)=>{
        if(response.length>0){
          this.productsList = response;
          console.log('PRODUCTS DATA: ',this.productsList);
          this.productDtService.setProductsDatas(this.productsList);
          
        }
      },
      error: (error)=>{
        console.log(error);
        
        this.messageService.add({
          severity:'error',
          summary: 'Error',
          detail: 'Erro ao buscar produtos',
          life: 3000
        });
    }});
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


}
