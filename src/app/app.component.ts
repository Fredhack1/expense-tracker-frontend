import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryListComponent } from "./components/category-list/category-list.component";
import { ExpenseListComponent } from "./components/expense-list/expense-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CategoryListComponent, ExpenseListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Expense Tracker';
}
