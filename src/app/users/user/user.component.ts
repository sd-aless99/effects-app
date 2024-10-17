import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/app.reducers';
import { loadUser } from '../../store/actions';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: ``,
})
export class UserComponent {
  user!: User | null;
  loading: boolean = false;
  error: any;
  userSub!: Subscription;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.userSub = this.store
      .select('user')
      .subscribe(({ user, loading, error }) => {
        this.user = user;
        this.loading = loading;
        this.error = error;
      });

    this.router.params.subscribe(({ id }) => {
      this.store.dispatch(loadUser({ id }));
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSub.unsubscribe();
  }
}
