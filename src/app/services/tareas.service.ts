import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Tarea } from '../interfaces/tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private http=inject(HttpClient);

  getTareas():Observable<Tarea[]>{
    return this.http.get<Tarea[]>("http://localhost:3000/tareas").pipe(
      catchError(error => {
        console.log("Hubo un problema al cargar las tareas");
        return of ([])
      })
    )
  }

  getTareasByStatus(status:string):Observable<Tarea[]>{
    return this.http.get<Tarea[]>(`http://localhost:3000/tareasPorEstado/${status}`).pipe(
      catchError(error => {
        console.log("Hubo un problema al cargar las tareas");
        return of ([])
      })
    )
  }

  getTareasByUser(userId:string):Observable<Tarea[]>{
    return this.http.get<Tarea[]>(`http://localhost:3000/tareasPorUsuario/${userId}`).pipe(
      catchError(error => {
        console.log("Hubo un problema al cargar las tareas");
        return of ([])
      })
    )
  }

  getTarea(id:string):Observable<Tarea>{
    return this.http.get<Tarea>(`http://localhost:3000/tareas/${id}`).pipe(
      map (res=>{
        console.log(res)
        return res
      }),
      catchError(error=>{
        console.log(`Error al obtener la tarea ${error}`);
        return of ({} as Tarea)
      })
    )
  }

  addTarea(tarea: Tarea):Observable<boolean>{
    return this.http.post<Tarea>('http://localhost:3000/nuevaTarea', tarea).pipe(
      map (res=>{
        return true
      }),
      catchError(error=>{
        console.log(`Error al añadir la tarea ${error}`);
        return of (false)
      })
    )
  }

  updateTarea(tarea:Tarea, id:string):Observable<boolean>{
    return this.http.put<Tarea>(`http://localhost:3000/actualizarTarea/${id}`, tarea).pipe(
      map (res=>{
        return true
      }),
      catchError(error=>{
        console.log(`Error al actualizar la tarea ${error}`);
        return of (false)
      })
    )
  }

  deleteTarea(id:string):Observable<boolean>{
    return this.http.delete("http://localhost:3000/borrarTarea",{
      body: {
        "idTarea":id
      }
    }).pipe(
      map(()=>true),
      catchError(error=>{
        console.log(`Error al eliminar la tarea ${error}`);
        return of (false)
      })
    )
  }
}
