import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUsers, loadUsersError, loadUsersSuccess } from '../actions';
import { mergeMap, map, catchError, of } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(
    //necesita un callback que devuelve un observable
    () =>
      this.actions$.pipe(
        //quiero que este pendiente de cuando se dispara la accion loadUsers
        //lo hago usando el metodo ofType de ngrx/effects
        ofType(loadUsers),
        //disparar un nuevo observable y que se unan, para pedir la informacion
        mergeMap(
          //necesita como callback el observable que quiero disparar
          //en este caso el observable lo obtenemos llamando al servicio y su metodo getUsers
          () =>
            this.userService
              .getUsers()
              //pasar por un pipe para ver flujo de informacion y hacer un map interno para el mergeMap
              .pipe(
                map((users) => loadUsersSuccess({ users: users })),
                catchError((err) => of(loadUsersError({ payload: err })))
              )
        )
      )
  );
}
