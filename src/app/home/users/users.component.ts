import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/data/user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedIndex: number;
  userId = null;
  deleteUser = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    //this.users = this.userService.getUsers();
    this.userService.fetchUsers().subscribe(
      (rspData)=> {
        this.users.push(new User(-20, 'UseName','Roles',false,''));
        this.users.push(...rspData);

        this.userService.setUser(this.users);
      }
    )
  }

  onSelectUser(index: number){
    this.router.navigate(['/social/users', index]);
  }

  onDeleteUser(index: number){
    this.userId = this.users[index].id;
    this.selectedIndex = index;
    this.deleteUser = 'are you sure you want to delete user?'
  }

  onHandleClose(){
    this.deleteUser = null;
  }

}
