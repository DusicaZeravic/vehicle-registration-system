import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { UserSidebarComponent } from '../components/user-sidebar/user-sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  imports: [
    UserSidebarComponent,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})

export class UserDetailsComponent {
  currentUser: any;
  userForm: FormGroup;

  constructor(private userService: UserService,
              private fb: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.currentUser = JSON.parse(this.userService.getCurrentUser());

    this.userForm.patchValue({
      username: this.currentUser.name,
      email: this.currentUser.email,
    });
  }
}