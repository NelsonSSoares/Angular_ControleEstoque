import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
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

  public productChartDatas!: ChartData;
  public productChartOptions!: ChartOptions;

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
          this.setProduductsChartConfig();
          
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

  setProduductsChartConfig(): void{

    if(this.productsList.length > 0){

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.productChartDatas = {
      labels: this.productsList.map((product)=> product?.name),
      datasets: [
        {
          label: 'Quantidade',
          data: this.productsList.map((product)=> product.amount),
          backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
          borderColor: documentStyle.getPropertyValue('--indigo-400'),
          borderWidth: 1
        }
      ]
    };

    this.productChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
          }
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder
    }
  }
}
    };
    };
  }
ngOnDestroy(): void {
  throw new Error('Method not implemented.');
}

}
  