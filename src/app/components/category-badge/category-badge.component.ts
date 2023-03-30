import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../models/category.model';

@Component({
  selector: 'app-category-badge',
  templateUrl: './category-badge.component.html',
  styleUrls: ['./category-badge.component.css']
})
export class CategoryBadgeComponent implements OnInit {

  @Input() category: Category;

  constructor() { }

  ngOnInit(): void {
  }

}
