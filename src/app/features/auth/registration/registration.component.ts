import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MessageService } from '../../../core/services/message.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class RegistrationComponent {
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    const data = {
      username: this.loginForm.value.username || '',
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.messageService.error(err);
      }
    });
  }

  get login(): any {
    return this.loginForm.controls;
  }
}