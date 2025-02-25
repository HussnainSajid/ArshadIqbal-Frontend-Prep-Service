import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

import {
  AvatarComponent,
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  SidebarToggleDirective
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { ApiService } from '../../../services/api.service';
import { SwalService } from '../../../services/swal.service';
import { UsersDto } from '../../../dto/UsersDto';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  imports: [ContainerComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, NavItemComponent, NavLinkDirective, RouterLink, RouterLinkActive, NgTemplateOutlet, BreadcrumbRouterComponent, DropdownComponent, DropdownToggleDirective, AvatarComponent, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective, DropdownDividerDirective]
})
export class DefaultHeaderComponent extends HeaderComponent {

  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' }
  ];
  userDetails: UsersDto | null = null;

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });

  constructor(private apiService: ApiService, private swalService: SwalService, private loaderService: LoaderService, private router: Router) {
    super();
  }

  sidebarId = input('sidebar1');

  verifyJwtToken() {
    this.loaderService.show();
    this.apiService.verifyJwtToken().subscribe({
      next: (response) => {
        if (response?.body?.success) {
          // ✅ Assign user details correctly
          this.userDetails = response.body.response.user;

          if (this.userDetails) {

            // ✅ Call verifyJwtToken() only if the current route is '/dashboard'
            if (this.router.url === '/dashboard') {
              this.swalService.showAlert(
                "Success!",
                "success",
                `Welcome, ${this.userDetails.firstName} ${this.userDetails.lastName}`
              );
            }
            this.loaderService.hide();
          }
        } else {
          this.loaderService.hide();
          this.swalService.showAlert("Error!", "error", "Failed to fetch user details.");
          // Navigate to login
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.loaderService.hide();
        this.swalService.showAlert("Error!", "error", "Error fetching user detail.");
        // Navigate to login
        this.router.navigate(['/']);
      }
    });
  }


  ngOnInit() {
    this.verifyJwtToken();
  }

  logoutUser() {
    this.loaderService.show();

    setTimeout(() => {
      this.apiService.logout();
      this.loaderService.hide();
    }, 1000); // 1000ms = 1 second
  }
}
