import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustommerService } from '../../services/custommer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private custommerService: CustommerService
  ) {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postal_code: [''],
      country: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  Valid(field: string) {
    return (
      this.form.get(field)?.invalid &&
      (this.form.get(field)?.dirty || this.form.get(field)?.touched)
    );
  }

  onSubmit() {
    console.log(this.form.value);
    this.custommerService.postcreateUser(this.form.value).subscribe({
      next: (rest) => {
         
        localStorage.setItem('customer', JSON.stringify(rest));

        Swal.fire({
          icon: 'success',
          title: 'Usuario creado',
          text: 'Puedes empezar a comprar ',
        });

        this.redireccionar();
      },
      error: (msg) => {
        Swal.fire({
          icon: 'error',
          title: 'Lo Sentimos ',
          text: msg.error,
        });
      },
    });
  }
  redireccionar() {
    this.router.navigate(['catalog']);
  }
}
