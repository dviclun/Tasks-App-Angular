import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http=inject(HttpClient);

  getUsers():Observable<User[]>{
    return this.http.get<User[]>("http://localhost:3000/usuarios").pipe(
      catchError(error=> {
        console.log("Error al obtener los usuarios");
        return of ([])
      })
    )
  }

  getUser(id:string):Observable<User>{
    return this.http.get<User>(`http://localhost:3000/usuarios/${id}`).pipe(
      map (res=>{
        console.log(res)
        return res
      }),
      catchError(error=>{
        console.log(`Error al obtener la tarea ${error}`);
        return of ({} as User)
      })
    )
  }
}
