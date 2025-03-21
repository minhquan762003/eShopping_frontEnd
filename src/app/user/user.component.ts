import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { FormsModule } from '@angular/forms';
import { SuggestionService } from '../suggestion.service';
import { UserService } from '../user.service';
import { MyAccountComponent } from "../my-account/my-account.component";
import { RouterModule } from '@angular/router';
import { BillsComponent } from "../bills/bills.component";
import { AlertsComponent } from "../alerts/alerts.component";
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, MyAccountComponent, RouterModule, BillsComponent, AlertsComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  searchQuery: string = '';
  suggestionService = inject(SuggestionService);
  suggestions: string[] = [];
  router = inject(Router);
  authService = inject(AuthService);
  currentUser:any = null;
  activeSection = 'account';
  ngOnInit(): void {
    // this.currentUser = this.authService.getCurrentUser();
    // console.log(this.currentUser);
  }
  onSearchChange(query: string) {
    this.searchQuery = query;
    if (query.trim()) {
      this.suggestionService.getSuggestions(query).subscribe(response => {
        this.suggestions = response.suggestions;
      });
    } else {
      this.suggestions = [];
    }
  }
  toSearch(nameProduct:string){
    this.router.navigate(['search']);
    localStorage.setItem('searchName', nameProduct);
  }
  selectSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.suggestions = []; // Ẩn gợi ý sau khi chọn
  }
  onRadioChange(event: Event): void {
    const radio = event.target as HTMLInputElement;
    if (radio.checked) {
      if(radio.value == "all"){

      }
      else{

      }

    } else {
    }
  }
  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
