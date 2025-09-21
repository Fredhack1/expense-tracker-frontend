import { Routes } from '@angular/router';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/expenses', pathMatch: 'full' },
    { path: 'expenses', component: ExpenseListComponent },
    { path: 'expenses/new', component: ExpenseFormComponent },
    { path: 'expenses/edit/:id', component: ExpenseFormComponent },
    { path: 'categories', component: CategoryListComponent }
];
