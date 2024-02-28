import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksListComponent } from '../tasks-list/tasks-list.component';
import { TareasService } from '../../services/tareas.service';
import { UsersService } from '../../services/users.service';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../../interfaces/tarea.interface';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{

  public estadoTarea: string = "";
  private _activedRouter=inject(ActivatedRoute);
  private serv_tareas = inject(TareasService);
  private serv_users = inject(UsersService);

  // public http = inject(HttpClient);

  public tareas: Tarea[] = [];
  public users: User[] = [];
  public currentUser?: User;

  public stars: string[] = [];

  ngOnInit(): void {
    this._activedRouter.params.subscribe(
      params=>{
        if(params){
          this.estadoTarea= params['estado'];
          this.cargarTareas();
        }
      }
    )

    this.getAllUsers();
  }

  cargarTareas(){
    this.serv_tareas.getTareasByStatus(this.estadoTarea).subscribe((resp)=>{
      this.tareas = resp;
      console.log(this.tareas);
    })
  }

  getAllUsers():void {
    this.serv_users.getUsers().subscribe(
      res => {
        this.users = res;
        console.log(this.users)
      }
    )
  }

  getCurrentUserName(id:string):boolean{
    this.currentUser = this.users.find(user => user._id === id)
    return true;
  }

  getColor(tipo: string):string{
    switch(tipo){
      case "pendiente":
        return "green"

      case "en progreso":
        return "blue"

      case "completada":
        return "red"

      default:
        return "black"
    }
  }

  fillStars(starsNumber:number):void{
    this.stars = []
    for (let i = 0; i < starsNumber; i++) {
      this.stars.push("");
    }
  }
}
