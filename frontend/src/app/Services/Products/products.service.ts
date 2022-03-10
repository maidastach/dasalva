import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/Interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService 
{
  productsSource = new BehaviorSubject<Product[] | null>(null)
  products = this.productsSource.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>
  {    
    return this.http.get<Product[]>('/api/products')
  }

  getProduct(id: string): Observable<Product>
  {
    return this.http.get<Product>(`/api/products/${id}`)
  }

  addReview(review: any): Observable<any>
  {
    return this.http.post<Product>('/api/products/review', review)
  }
}
