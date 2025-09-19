import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { CategoryService } from '../../services/category.service';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [NgIf, NgForOf, RouterLink],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {
  expenses: any[] = [];
  categories: any[] = [];

  constructor(
    private expenseService: ExpenseService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadExpenses();
    this.loadCategories();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe(data => {
      this.expenses = data;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'N/A';
  }

  deleteExpense(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
      this.expenseService.deleteExpense(id).subscribe(() => {
        this.loadExpenses();
      });
    }
  }
}
