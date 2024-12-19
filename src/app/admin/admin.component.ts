import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  currentAdmin: User|undefined;
  userSerVice = inject(UserService);
  authService = inject(AuthService);
  data :any;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  constructor(private router: Router, private cookieService: CookieService) { }
}
