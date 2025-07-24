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
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggle,
    HeaderComponent
  ],
})
export class RegisterComponent {
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    isAdmin: [false, Validators.required],
  });

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const data = {
      username: this.registerForm.value.username || '',
      email: this.registerForm.value.email || '',
      password: this.registerForm.value.password || '',
      isAdmin: this.registerForm.value.isAdmin ? ['Admin', 'Zaposleni'] : ['Zaposleni']
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

  get register() {
    return this.registerForm.controls;
  }
}