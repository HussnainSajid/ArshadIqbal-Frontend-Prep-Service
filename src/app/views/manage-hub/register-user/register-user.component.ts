import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PopoverModule, CardHeaderComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormControlDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, TableDirective, FormSelectDirective, PageItemDirective, PageLinkDirective, PaginationComponent } from '@coreui/angular';
import { RolesDto } from '../../../dto/RolesDto';
import { UsersDto } from '../../../dto/UsersDto';
import { ApiService } from '../../../services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwalService } from '../../../services/swal.service';
import { LoaderService } from '../../../services/loader.service';
import { PaginationRequestDto } from '../../../dto/PaginationRequestDto';

@Component({
  selector: 'register-user',
  templateUrl: './register-user.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CardHeaderComponent, RowComponent, ColComponent,
    TextColorDirective, CardComponent, CardBodyComponent, FormControlDirective,
    ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent,
    ModalHeaderComponent, ModalTitleDirective, TableDirective, PageItemDirective, PageLinkDirective, PaginationComponent, FormSelectDirective, PopoverModule
  ]
})
export class RegisterUserComponent implements OnInit {
  registerUserForm!: FormGroup;
  visible: boolean = false;
  modalTitle: string = 'Manage User';
  isEditMode: boolean = false;
  userRoles: RolesDto[] = [];
  usersList: UsersDto[] = [];
  pagination = new PaginationRequestDto(1, 10); // Default page number & page size
  totalRecords = 0;
  totalPages = 0;

  constructor(private swalService: SwalService, private apiService: ApiService, private cd: ChangeDetectorRef, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserRoles();
    this.loadAllUsers();
  }

  loadUserRoles() {
    this.loaderService.show();
    this.apiService.getUserRoles().subscribe({
      next: (response) => {
        if (response?.body?.success) {
          this.userRoles = response.body.response.map((role: any) => ({
            id: role.key,
            name: role.value
          }));
          this.loaderService.hide();
        } else {
          this.loaderService.hide();
          this.swalService.showAlert("Error!", "error", "Failed to fetch roles");
        }
      },
      error: () => {
        this.loaderService.hide();
        this.swalService.showAlert("Error!", "error", "Error fetching roles");
      }
    });
  }

  loadAllUsers() {
    this.loaderService.show();

    this.apiService.getAllUsers(this.pagination).subscribe({
      next: (response) => {
        if (response?.success) {
          const pagedData = response.response; // Extracting paginated response

          // Check if there are records
          this.usersList = pagedData.items.length
            ? pagedData.items.map((user: any) => ({
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              address: user.address,
              role: user.role,
              phoneNumber: user.phoneNumber,
            }))
            : []; // Empty array if no records

          this.totalRecords = Number(pagedData.totalCount) || 0; // Convert to number, default to 0 if invalid
          this.pagination.PageSize = Number(pagedData.pageSize) || 1; // Default to 1 to avoid division by zero
          this.totalPages = this.totalRecords > 0 ? Math.ceil(this.totalRecords / this.pagination.PageSize) : 0; // Calculate total pages

        } else {
          this.swalService.showAlert("Error!", "error", "Failed to fetch users list.");
        }
        this.loaderService.hide();
      },
      error: () => {
        this.swalService.showAlert("Error!", "error", "Error fetching users list.");
        this.loaderService.hide();
      }
    });
  }

  // Navigate to specific page
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return; // Prevent invalid page numbers
    this.pagination.PageNumber = page;
    this.loadAllUsers(); // Reload data for new page
  }

  private initializeForm() {
    this.registerUserForm = new FormGroup({
      id: new FormControl(0),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  openUserModal(editMode: boolean) {
    this.registerUserForm.reset();
    this.isEditMode = editMode;
    this.modalTitle = editMode ? 'Edit User' : 'Create User';
    this.visible = true;
  }

  closeUserModal() {
    this.visible = false;
    this.registerUserForm.reset();
  }

  handleUsersModalChange(event: boolean) {
    this.visible = event;
    this.registerUserForm.reset();
  }

  editUserData(user: UsersDto) {
    this.populateUserData(user.id);
  }

  populateUserData(userId: number) {
    this.loaderService.show();
    this.apiService.getUserById(userId).subscribe(
      (response) => {
        if (response?.success && response?.response) {
          const res = response.response;

          setTimeout(() => {
            this.registerUserForm.patchValue({
              id: res.id,
              firstName: res.firstName || '',
              lastName: res.lastName || '',
              email: res.email || '',
              phoneNumber: res.phoneNumber || '',
              role: res.role || '',
              address: res.address || '',
              password: '',
              confirmPassword: ''
            });
          }, 100);

          this.cd.detectChanges();
          this.modalTitle = 'Edit User';
          this.visible = true;
          this.loaderService.hide();
        } else {
          this.loaderService.hide();
          this.swalService.showAlert("Error!", "error", `Error fetching user details!`);
        }
      },
      (error) => {
        this.loaderService.hide();
        this.swalService.showAlert("Error!", "error", `Error fetching user details! ${error}`);
      }
    );
  }

  saveUsersData() {
    if (this.registerUserForm.invalid) {
      this.swalService.showAlert("Warning!", "warning", "Please fill all required fields!");
      return;
    }

    const formData = this.registerUserForm.value;
    if (formData.password !== formData.confirmPassword) {
      this.swalService.showAlert("Warning!", "warning", "Passwords do not match!");
      return;
    }

    delete formData.confirmPassword;

    this.loaderService.show();
    if (this.modalTitle === "Create User") {
      formData.id = 0;
      this.apiService.createUser(formData).subscribe({
        next: () => {
          this.loaderService.hide();
          this.swalService.showAlert("Success!", "success", "User saved successfully!");
          this.closeUserModal();
          this.loadAllUsers();
        },
        error: (err) => {
          this.loaderService.hide();
          this.swalService.showAlert("Error!", "error", `Failed to save user! ${err}`);
        }
      });
    } else {
      this.apiService.updateUser(formData).subscribe({
        next: () => {
          this.loaderService.hide();
          this.swalService.showAlert("Success!", "success", "User updated successfully!");
          this.closeUserModal();
          this.loadAllUsers();
        },
        error: (err) => {
          this.loaderService.hide();
          this.swalService.showAlert("Error!", "error", `Failed to update user! ${err}`);
        }
      });
    }
  }

  deleteUserData(user: any) {
    this.swalService.showConfirmationModal(
      "User Delete",
      `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
      "Yes, delete it!"
    ).then((result) => {
      if (result.isConfirmed) {
        this.loaderService.show();
        this.apiService.deleteUser(user.id).subscribe(
          () => {
            this.loaderService.hide();
            this.swalService.showAlert("Deleted!", "success", "User has been deleted.");
            this.loadAllUsers();
          },
          (error) => {
            this.loaderService.hide();
            this.swalService.showAlert("Error!", "error", `Failed to delete user. ${error}`);
          }
        );
      }
    });
  }
}