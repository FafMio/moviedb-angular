import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {Category} from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  categorySubject: BehaviorSubject<Array<Category>>;

  categories: Array<Category>;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.categorySubject = new BehaviorSubject<Array<Category>>([]);
    this.init();
  }


  init(): void {
    this.categories = this.getAllCategories();
    this.categorySubject.next(this.categories);
  }


  getAllCategories(): Array<Category> {
    const array: Array<Category> = [];
    this.httpClient
      .get('https://api.allocinoche.top/api/category/?size=50')
      .subscribe(
        (res: any) => {
          const data = res.content;
          data.forEach(s => {
            const currentCategory = new Category(
              s.id,
              s.title,
              s.bgHexColor,
              s.textHexColor);
            array.push(currentCategory);
          });
        }
      );
    return array;
  }

  getCategory(id: number): Observable<any> {
    return this.httpClient.get('https://api.allocinoche.top/api/category/' + id);
  }

  addCategory(category: any): void {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post('https://api.allocinoche.top/api/category', category, {headers}).subscribe(
      (res: any) => {
        this.categories.push(res);
        this.categorySubject.next(this.getAllCategories());
      }
    );
  }

  deleteCategory(id: number): Subscription {
    return this.httpClient.delete('https://api.allocinoche.top/api/category/' + id)
      .subscribe(
        (res: any) => {
          for (let i = 0; i < this.categorySubject.getValue().length; i++) {
            if (this.categories[i].id === id) {
              this.categories.splice(i, 1);
              this.categorySubject.next(this.categories);
            }
          }
        }
      );
  }


  updateCategory(category: Category): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUser().accessToken);
    const data = {
      id: category.id,
      title: category.title,
      bgHexColor: category.bgHexColor,
      textHexColor: category.textHexColor,
    };

    this.httpClient.put(
      'https://api.allocinoche.top/api/category/' + category.id,
      data,
      {headers}
    ).subscribe(
      (res: any) => {
        this.categorySubject.next(this.getAllCategories());
      }
    );
  }

}
