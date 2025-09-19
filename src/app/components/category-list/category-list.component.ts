import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  // noCategories: String = "No Catégories yet !";

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }
}
