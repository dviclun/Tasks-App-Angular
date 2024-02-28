import { Component, OnInit, inject } from '@angular/core';
import { Tarea } from '../../interfaces/tarea.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TareasService } from '../../services/tareas.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit{
  ngOnInit(): void {
    this.getTareas();
    this.getAllUsers();
  }

  private serv_tareas = inject(TareasService);
  private serv_users = inject(UsersService);

  // public http = inject(HttpClient);

  public tareas: Tarea[] = [];
  public users: User[] = [];
  public currentUser?: User;

  public stars: string[] = [];

  getTareas():void{
    this.serv_tareas.getTareas().subscribe((resp)=>{
      this.tareas = resp;
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

  deleteTarea(id:string):void{
    this.serv_tareas.deleteTarea(id).subscribe(
      res => {
        if(res){
          this.getTareas(); //Recargamos las tareas
        }
    });
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
