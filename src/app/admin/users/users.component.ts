import { Component } from '@angular/core';
import { User } from '../../auth/auth.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(userId: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.adminService.deleteUser(userId).subscribe(() => {
        alert("User deleted successfully.");
        this.loadUsers();
      });
    }
  }
}
