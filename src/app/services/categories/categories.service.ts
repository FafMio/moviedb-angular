import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscribable, Subscription} from 'rxjs';
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
      .get('http://127.0.0.1:8080/api/category/')
      .subscribe(
        (res: any) => {
          console.log(res);
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
    return this.httpClient.get('http://127.0.0.1:8080/api/category/' + id);
  }

  addCategory(category: any): void {
    console.log(category);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post('http://127.0.0.1:8080/api/category', category, {headers}).subscribe(
      (res: any) => {
        console.log(res);
        this.categories.push(res);
        this.categorySubject.next(this.getAllCategories());
      },
      (err) => {
        console.log('error: ', err);
      }
    );
  }

  deleteCategory(id: number): Subscription {
    return this.httpClient.delete('http://127.0.0.1:8080/api/category/' + id)
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
    console.log(category);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token.toString());
    const data = {
      id: category.id,
      title: category.title,
      bgHexColor: category.bgHexColor,
      textHexColor: category.textHexColor,
    };
    console.log(data);

    this.httpClient.put(
      'http://127.0.0.1:8080/api/category/' + category.id,
      data,
      {headers}
    ).subscribe(
      (res: any) => {
        this.categorySubject.next(this.getAllCategories());
      }
    );
  }

}