import { Routes } from '@angular/router';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';

export const routes: Routes = [
    { path: '', component: ExpenseListComponent },
    { path: 'expenses/new', component: ExpenseFormComponent },
    { path: 'expenses/edit/:id', component: ExpenseFormComponent }
];
