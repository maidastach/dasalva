import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactForm } from 'src/app/Interfaces/Contact';
import { OrderForAdmin } from 'src/app/Interfaces/Order';
import { Product } from 'src/app/Interfaces/Product';
import { User } from 'src/app/Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  //GET USERS
  getUsers(): Observable<User[]>
  {
    return this.http.get<User[]>('/api/admin/getusers')
  }




  //GET ORDERS
  getOrders(): Observable<OrderForAdmin[]>
  {
    return this.http.get<OrderForAdmin[]>('/api/admin/getorders')
  }
  //DELETE ORDER
  deleteOrder(id: string): Observable<OrderForAdmin>
  {
    return this.http.delete<OrderForAdmin>(`/api/admin/deleteorder/${id}`)
  }
  //DELIVER ORDER
  deliverOrder(id: string): Observable<OrderForAdmin>
  {
    return this.http.get<OrderForAdmin>(`/api/admin/deliverorder/${id}`)
  }
  //SEND DELIVER/PICKUP INSTRUCTIONS
  sendInstructions(form: { day: string, time: string, id: string }): Observable<OrderForAdmin>
  {
    return this.http.post<OrderForAdmin>('/api/admin/deliverinstructions', form)
  }




  //GET CONTACT REQUESTS
  getContacts(): Observable<ContactForm[]>
  {
    return this.http.get<ContactForm[]>('/api/admin/getcontacts')
  }

  //GET SESSIONS
  


  //PRODUCT SERVICES
  createProduct(product: Product): Observable<Product>
  {
    return this.http.post<Product>('/api/admin/products', product)
  }

  updateProduct(product: Product): Observable<Product>
  {
    return this.http.put<Product>(`/api/admin/products/${product._id}`, product)
  }

  deleteProduct(id: string): Observable<Product>
  {
    return this.http.delete<Product>(`/api/admin/products/${id}`)
  }

  uploadImageProduct(product: Product): Observable<Product>
  {
    return this.http.post<Product>('/api/admin/products/image', product)
  }

  deleteImageProduct(product: Product): Observable<Product>
  {
    return this.http.post<Product>('/api/admin/products/deleteimage', product)
  }

  
}
