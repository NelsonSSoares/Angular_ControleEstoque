import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/get-all-products-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookieService.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.JWT_TOKEN}`
    })
  };

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    return this.http.get<Array<GetAllProductsResponse>>(`${this.API_URL}/products`, this.httpOptions)
    .pipe(
      map((product) => product
      .filter(data => data.amount > 0))
      
    );
  }
}
