import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from 'src/app/Interfaces/Cart';
import { ContactForm } from 'src/app/Interfaces/Contact';
import { Order } from 'src/app/Interfaces/Order';
import { Product } from 'src/app/Interfaces/Product';
import { Shipping, User } from 'src/app/Interfaces/User';

export const pickUpAddress: Shipping = {
  _id: '0',
  addressA: 'Da Mario',
  addressB: '36 Morley Avenue',
  city: 'Rosebery',
  postalCode: '2018',
  state: 't: (02)96692242',
  isSelected: true,
}

@Injectable({
  providedIn: 'root'
})

export class UserService
{
  constructor(private http: HttpClient) { }

  cartSource = new BehaviorSubject<CartItem[]>([])
  cart = this.cartSource.asObservable();

  addressSource = new BehaviorSubject<Shipping | null>(null)
  address = this.addressSource.asObservable();

  orderSource = new BehaviorSubject<Order | null>(null)
  order = this.orderSource.asObservable();

  messageSource = new BehaviorSubject<string>('')
  message = this.messageSource.asObservable();

  isEditingShippingSource = new BehaviorSubject<boolean>(false)
  isEditingShipping = this.isEditingShippingSource.asObservable()

  //CART SERVICES
  getCart(): Observable<CartItem[]>
  {    
    return this.http.get<CartItem[]>('/api/users/cart')
  }

  setCart(cart: CartItem[]): Observable<CartItem[]>
  {
    return this.http.post<CartItem[]>('/api/users/cart', cart)
  }

  addToCart(product: Product): void
  {
    this.messageSource.next(`${product.title} added to the Cart!`)
    setTimeout(() => this.messageSource.next(''), 2000)

    const toAdd: CartItem = { 
      _id: product._id, 
      title: product.title, 
      image: product.image[0], 
      price: product.price, 
      quantity: 1 
    }
    const itemExist = this.cartSource.value.find(x => x._id === toAdd._id);
    if(itemExist)
      this.cartSource.next(
        this.cartSource.value.map(
          x => 
            (x._id === toAdd._id)
              ? { ...x, quantity: x.quantity + 1 }
              : x
        )
      );
    else
      this.cartSource.next(
        [ ...this.cartSource.value, toAdd ]
      )
    
    this.setCart(this.cartSource.value).subscribe()
  }




  //CONTACT SERVICES
  sendContactForm(form: ContactForm): Observable<ContactForm>
  {    
    return this.http.post<ContactForm>('/api/contact', form)
  }




  //ADDRESS SERVICES
  addShippingAddress(address: Shipping): Observable<{ user: User, address: Shipping }>
  {
    return this.http.post<{ user: User, address: Shipping }>('api/users/createshipping', address)
  }

  deleteShippingAddress(id: string): Observable<User>
  {
    return this.http.delete<User>(`api/users/deleteshipping/${id}`)
  }
  
  editShippingAddress(address: Shipping): Observable<{ user: User, findAddress: Shipping }>
  {
    return this.http.post<{ user: User, findAddress: Shipping }>('api/users/editshipping', address)
  }



  //HANDLING SELECTED ADDRESS
  selectShippingAddress(id: Shipping['_id']): Observable<User>
  {
    return this.http.post<User>('/api/users/selectshipping', { id })
  }

  getSelectedAddress(): Observable<Shipping>
  {
    return this.http.get<Shipping>('/api/users/getselectedaddress') || []
  }

  


  //ADDING ADDRESS TO ACCESS SHIPPING PAGE
  isAddingAddress(): Observable<User>
  {
    return this.http.get<User>('api/users/isaddingaddress')
  }

  //SEETTING PICK UP OPTION
  isPickingUp(): Observable<User>
  {
    return this.http.get<User>('api/users/ispickingup')
  }

  


  //ORDER SERVICES
  getUserOrders(): Observable<Order[]>
  {
    return this.http.get<Order[]>('/api/orders/mine')
  }

  getOrder(id: Order['_id']): Observable<{ user: User, order: Order }>
  {
    return this.http.get<{ user: User, order: Order }>(`/api/orders/${id}`)
  }

  createOrder(order: Order): Observable<Order>
  {
    return this.http.post<Order>('/api/orders', order)
  }

  orderGuard(id: Order['_id']): Observable<boolean>
  {
    return this.http.get<boolean>(`/api/orders/guard/${id}`)
  }
  
}
