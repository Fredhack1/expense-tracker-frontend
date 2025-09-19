import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { NgIf, NgForOf, NgClass, CommonModule } from "../../../../node_modules/@angular/common/index";

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent implements OnInit {
  expenseForm: FormGroup;
  categories: any[] = [];
  isEditMode = false;
  expenseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.expenseForm = this.fb.group({
      id: [null],
      description: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      date: [new Date().toString().substring(0, 10), Validators.required],
      category: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.expenseId = +id;
        this.loadExpense(this.expenseId);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadExpense(id: number): void {
    this.expenseService.getExpenseById(id).subscribe(expense => {
      // On fourni un objet complet de type 'Category'
      // Pour que le select du formulaire puisse fonctionner correctement.
      const category = this.categories.find(c => c.id === expense.category.id);
      this.expenseForm.patchValue({
        ...expense,
        category: category
      });
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const expenseData = this.expenseForm.value;
      const formattedDate = new Date(expenseData.date).toISOString().split('T')[0];

      const formattedExpenseData = {
        id: expenseData.id,
        description: expenseData.description,
        amount: Number(expenseData.amount),
        date: formattedDate,
        category: { id: expenseData.category.id }
      };

      console.log(formattedExpenseData);

      if (this.isEditMode) {
        this.expenseService.updateExpense(formattedExpenseData).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.expenseService.addExpense(formattedExpenseData).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

}
