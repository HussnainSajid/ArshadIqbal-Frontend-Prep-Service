import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginDto } from '../dto/LoginDto';
import { RatesTariffDto } from '../dto/RatesTariffDto';
import { UsersDto } from '../dto/UsersDto';
import { PaginationRequestDto } from '../dto/PaginationRequestDto';

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

  // Validate JWT Token
  verifyJwtToken(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Attach the token
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/Auth/VerifyJwtToken`, { headers, observe: 'response' });
  }

  // ✅ Generic method for paginated POST requests
  getPaginated<T>(endpoint: string, pagination: PaginationRequestDto): Observable<T> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // ✅ Attach the token
      'Content-Type': 'application/json'
    });

    // ✅ Sending pagination data in the request body as FormBody (POST)
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, pagination, { headers });
  }

  //////// Common Controller ////////
  getUserRoles(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Attach the token
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/Common/GetUserRoles`, { headers, observe: 'response' });
  }

  //////// User Controller ////////
  getAllUsers(pagination: PaginationRequestDto): Observable<any> {
    return this.getPaginated<any>('User/GetAllUsers', pagination);
  }

  // Create User
  createUser(userData: UsersDto): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Attach the token
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/User/CreateUser`, userData, { headers });
  }

  // Update User
  updateUser(userData: UsersDto): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.apiUrl}/User/UpdateUser`, userData, { headers });
  }

  // Get User by Id
  getUserById(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<UsersDto>(`${this.apiUrl}/User/GetUserDetailByUserId/${userId}`, { headers });
  }

  // Delete User
  deleteUser(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${this.apiUrl}/User/DeleteUser/${userId}`, { headers });
  }

  //////// Rates Tariff Controller ////////
  getAllRates(pagination: PaginationRequestDto): Observable<any> {
    return this.getPaginated<any>('RatesTariff/GetAllRates', pagination);
  }

  // Create Rate
  createRate(ratesTariffData: RatesTariffDto): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Attach the token
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/RatesTariff/CreateRate`, ratesTariffData, { headers });
  }
  
  // Update Rate
  updateRate(ratesTariffData: RatesTariffDto): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.apiUrl}/RatesTariff/UpdateRate`, ratesTariffData, { headers });
  }

  // Get Rate by Id
  getRateById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<RatesTariffDto>(`${this.apiUrl}/RatesTariff/GetRateById/${id}`, { headers });
  }

  // Delete Rate
  deleteRate(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${this.apiUrl}/RatesTariff/DeleteRate/${id}`, { headers });
  }
}