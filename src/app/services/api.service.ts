import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginDto } from '../dto/LoginDto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7185/api';  // Your .NET Core API URL

  constructor(private http: HttpClient, private router: Router) { }

  //////// Auth Controller ////////
  // Login User and Store JWT Token
  login(loginDto: LoginDto): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/Auth/Login`, loginDto).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }
  

  // Logout User
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Check if User is Logged In
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.isTokenExpired(token);
  }

  // Validate JWT Token Expiry
  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      return true; // If decoding fails, assume token is invalid
    }
  }
}