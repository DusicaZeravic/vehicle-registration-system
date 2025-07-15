import { Component } from '@angular/core';
import { UserSidebarComponent } from '../components/user-sidebar/user-sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from '../../../core/services/message.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './change-password.component.html',
  imports: [
    UserSidebarComponent,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})

export class ChangePasswordComponent {
  passwordForm: FormGroup
  currentUser: any;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private userService: UserService
  ) {}


  ngOnInit(): void {
    this.currentUser = JSON.parse(this.userService.getCurrentUser());

    this.passwordForm = this.fb.group({
      CurrentPassword: ['', Validators.required],
      NewPassword: ['', Validators.required],
    });
  }

  changePassword(): void {
    const data = {
      ...this.passwordForm.value,
      Email: this.currentUser.email
    };

    this.authService.changePassword(data).subscribe({
      next: () => {
        this.messageService.success('Lozinka je uspješno promijenjena');
      },
      error: (err) => {
        this.messageService.error(err);
      }
    })
  }
}