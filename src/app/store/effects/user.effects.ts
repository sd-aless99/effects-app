import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUser, loadUserError, loadUserSuccess } from '../actions';
import { mergeMap, map, catchError, of } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      mergeMap((action) =>
        this.userService.getUserById(action.id).pipe(
          map((user) => loadUserSuccess({ user: user })),
          catchError((err) => of(loadUserError({ payload: err })))
        )
      )
    )
  );
}
