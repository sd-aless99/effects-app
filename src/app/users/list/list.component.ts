import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent {
  usersList: User[] = [];

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userService.getUsers().subscribe((users) => {
      console.log(users);
      this.usersList = users;
    });
  }
}
