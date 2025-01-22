import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Services/auth.service';
import { ChatComponent } from "../chat/chat.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  currentUserId: string = "";
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  selectedUserId: string = "";
  selectedEmailId: string = "";

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    console.log(user);
    if (user) {
      this.currentUserId = user.uid;
    } else {
      this.router.navigate([""], {replaceUrl: true});
    }
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users.filter(user => user.id !== this.currentUserId);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  startChat(userId: string, userEmail: string) {
    this.selectedUserId = userId;
    this.selectedEmailId = userEmail;
    // Navigate to the chat screen when a user is selected
    // this.router.navigate(['/chat', {id: userId, email: userEmail}]);
  }
}
