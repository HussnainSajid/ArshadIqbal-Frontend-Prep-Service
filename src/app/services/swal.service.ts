import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  /**
   * Shows a simple alert with a title, text, and icon.
   * @param title Alert title
   * @param icon Alert icon (success, error, warning, info, question)
   * @param text Alert message
   */
  showAlert(title: string, icon: SweetAlertIcon, text: string): void {
    Swal.fire({
      position: "top-end",
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: false,
      timer: 1500
    });
  }

  /**
   * Shows a confirmation modal with custom messages and colors.
   * @param title Confirmation title
   * @param text Confirmation message
   * @param confirmButtonText Text for confirm button
   * @param cancelButtonText Text for cancel button (optional)
   * @returns Promise resolving to the SweetAlertResult
   */
  showConfirmationModal(
    title: string,
    text: string,
    confirmButtonText: string = "Yes, proceed!",
    cancelButtonText: string = "Cancel"
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    });
  }
}