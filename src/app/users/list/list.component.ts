import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/app.reducers';
import { loadUsers } from '../../store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent {
  usersList: User[] = [];
  loading: boolean = false;
  error: any;
  usersSub!: Subscription;

  //la peticion http para la lista se hace disparando la accion
  //en lugar de llamando al userService
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    //como se hace con un servicio
    /* this.userService.getUsers().subscribe((users) => {
      console.log(users);
      this.usersList = users;
    }); */

    //proceso con efectos
    //me subscribo al store para cargar los datos obtenidos de la accion al array
    //si esta vacio no se carga nada, en cuanto el store cambia por la accion=>efecto=>servicio
    //se cargan los datos
    this.usersSub = this.store
      .select('users')
      .subscribe(({ users, loading, error }) => {
        this.usersList = users;
        this.loading = loading;
        this.error = error;
      });

    //disparo la accion de loadUsers pero la carga de datos ocurre con la accion loadSuccess
    this.store.dispatch(loadUsers());
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe;
  }
}
