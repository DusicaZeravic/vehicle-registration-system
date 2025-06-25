import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toast: ToastrService) {
  }

  // error(error: any): void {
  //   let errorMessage: string = 'Dogodila se greška';
  //   if (error && error.error && error.error.errorCode) {
  //     switch (error.error.errorCode) {
  //       default:
  //         errorMessage = 'Dogodila se greška';
  //     }
  //   }
  // }

  warning(message: string): void {
    this.toast.warning(message);
  }

  success(message: string): void {
    this.toast.success(message);
  }

  info(message: string): void {
    this.toast.info(message);
  }

  error(message: string): void {
    this.toast.error('Dogodila se greška');
  }
}
