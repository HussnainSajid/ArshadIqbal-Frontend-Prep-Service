import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { LoginDto } from '../../../dto/LoginDto';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(){
    localStorage.removeItem('token');
  }

  loginUser() {
    if (!this.email || !this.password) {
      alert('Please enter your email and password.');
      return;
    }
    const loginDto: LoginDto = new LoginDto(this.email, this.password, "testing");

    this.apiService.login(loginDto).subscribe(
      response => {
        if(response.success){
          console.log('Login successful', response);

        // Save token in local storage
        localStorage.setItem('token', response.token);

        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
        }else{
          
        alert('Invalid email or password.');
        }
      },
      error => {
        console.error('Login failed', error);
        alert('Invalid email or password.');
      }
    );
  }
}
