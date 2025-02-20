import { Component } from '@angular/core';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective } from '@coreui/angular';

@Component({
  selector: 'register-user',
  templateUrl: './register-user.component.html',
  standalone: true,
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective]
})
export class RegisterUserComponent {
  constructor() { }
}