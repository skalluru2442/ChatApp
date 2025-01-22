import { Component, ElementRef, inject, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../Services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  date_times: any[] = [];
  newMessage: string = '';
  loggedInUserId: string = '';
  selectedUserId: string = '';
  chatId: string = '';
  selectedUserEmail: string = '';
  private chatService = inject(ChatService);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  @ViewChild('chatContent') private chatContent: ElementRef | undefined;
  @Input() userId: string = "";
  @Input() userEmail: string = "";

  ngOnInit() {
    if (this.userId != "" && this.userEmail != "") {
      this.selectedUserId = this.userId;
      this.selectedUserEmail = this.userEmail;
      this.loadData();
    } else {
      this.selectedUserId = this.route.snapshot.paramMap.get('id') || '';
      this.selectedUserEmail = this.route.snapshot.paramMap.get('email') || '';
      this.loadData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && changes['userEmail']) {
      this.selectedUserId = changes['userId'].currentValue;
      this.selectedUserEmail = changes['userEmail'].currentValue;
      this.loadData();
    }
  }

  loadData() {
    var user = this.authService.getCurrentUser();
    if (user) {
      this.loggedInUserId = user.uid;
      if (this.selectedUserId) {
        this.chatId = [this.loggedInUserId, this.selectedUserId].sort().join('_');
        this.verifyChat();
      }
    } else {
      this.router.navigate([""], { replaceUrl: true });
    }
  }

  verifyChat() {
    this.chatService.verifyChatId(this.chatId).then(isValid => {
      if (!isValid) {
        console.log("Chat does not exist. Creating a new chat.");
        this.chatService.createNewChat(this.loggedInUserId, this.selectedUserId).then(() => {
          this.getMessages();
        });
      } else {
        this.getMessages();
      }
    });
  }

  getMessages() {
    this.chatService.getMessages(this.chatId).subscribe(messages => {
      this.messages = messages.sort((a, b) => a.createdAt?.toDate() - b.createdAt?.toDate());
      console.log(this.messages);
      this.date_times = this.messages.map(message => {
        const date = message.createdAt?.toDate();
        return this.formatDate(date);
      });
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom(); // Scroll to bottom whenever the view is updated
  }

  scrollToBottom(): void {
    try {
      this.chatContent!.nativeElement.scrollTop = this.chatContent!.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours() % 12 || 12).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const message = { sender: this.loggedInUserId, text: this.newMessage };
      this.chatService.sendMessage(this.chatId, message);
      this.newMessage = '';
    }
  }
}
