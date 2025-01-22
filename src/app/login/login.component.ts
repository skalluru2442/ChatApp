import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';
  authService = inject(AuthService);
  router = inject(Router);

  async onSubmit() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (error: any) {
      if(error.message == "Firebase: Error (auth/invalid-credential).") {
        this.errorMessage = "Invalid Username/Password.";
      } else {
        this.errorMessage = error.message;
      }
    }
  }
  
}
