import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroceryItem } from './grocery-item';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApireqService {

  constructor(private http: HttpClient) { }

  getHome(): Observable<GroceryItem[]> {
    const url = `${environment.apiUrl}`;
    let res = this.http.get<GroceryItem[]>(url);
    return res;
  }
  deleteItem(id: number): void {
    const url = `${environment.apiUrl}/${id}`;
    console.log('Delete URL:', url);
    let res = this.http.delete(url, { responseType: 'text' });
    res.subscribe({
      next: (data) => {
        console.log('Delete response:', data);
      },
      error: (error) => {
        console.error('Error deleting item:', error);
      }
    });
  }
  getItem(id: number): Observable<GroceryItem> {
    const url = `${environment.apiUrl}/${id}`;
    let res = this.http.get<GroceryItem>(url);
    return res;
  }
}
