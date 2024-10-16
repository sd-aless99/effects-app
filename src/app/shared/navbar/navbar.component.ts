import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: ``,
})
export class NavbarComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  goToUser(id: string) {
    if (!id) {
      return;
    }

    this.router.navigate(['/user]', id]);
  }
}
