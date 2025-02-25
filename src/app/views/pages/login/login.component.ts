import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { LoginDto } from '../../../dto/LoginDto';
import { SwalService } from '../../../services/swal.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private loaderService: LoaderService, private swalService: SwalService, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('token');
  }

  loginUser() {
    if (!this.email || !this.password) {
      this.swalService.showAlert("Warning!", "warning", "Please enter your email and password.");
      return;
    }
    const loginDto: LoginDto = new LoginDto(this.email, this.password, "testing");
    this.loaderService.show();
    this.apiService.login(loginDto).subscribe(
      response => {
        if (response.success) {
          // Save token in local storage
          localStorage.setItem('token', response.response.token);
          // localStorage.setItem('userDetails', response.response.token);
          this.loaderService.hide();
          // Navigate to dashboard
          this.router.navigate(['/dashboard']);
        } else {

          this.loaderService.hide();
          this.swalService.showAlert("Warning!", "warning", "Invalid email or password.");
        }
      },
      error => {
        this.loaderService.hide();
        this.swalService.showAlert("Error!", "error", `Login failed: ${error}`);
      }
    );
  }
}
