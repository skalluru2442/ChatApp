import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  async onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match!";
      return;
    }
    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate([""], {replaceUrl: true});
    } catch (error: any) {
      if(error.message == "Firebase: Error (auth/email-already-in-use).") {
        this.errorMessage = "Email is already in use."
      } else if(error.message == "Firebase: Password should be at least 6 characters (auth/weak-password)."){
        this.errorMessage = "Password should be at least 6 characters."
      } else{
        this.errorMessage = error.message;
      }
    }
  }
}
