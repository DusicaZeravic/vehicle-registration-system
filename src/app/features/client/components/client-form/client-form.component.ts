import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-client-form",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: "./client-form.component.html",
})
export class ClientFormComponent {
  clientForm: FormGroup;
  @Output() clientAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      ime: ["", Validators.required],
      prezime: ["", Validators.required],
      jmbg: ["", [Validators.required, Validators.pattern(/^\d{13}$/)]],
      adresa: ["", Validators.required],
      brojTelefona: [""],
      email: ["", Validators.email],
      datumRodjenja: [""],
      brojLicneKarte: ["", [Validators.required, Validators.pattern(/^\d{9}$/)]],
    });
  }

  onAddNewClient() {
    if (this.clientForm.valid) {
      this.clientAdded.emit(this.clientForm.value);
    }
  }
}