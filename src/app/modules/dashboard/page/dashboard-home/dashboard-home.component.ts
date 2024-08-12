import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/get-all-products-response';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnInit {

  public productsList: Array<GetAllProductsResponse> = [];

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


}
