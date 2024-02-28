import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { TareasService } from '../../services/tareas.service';
import { UsersService } from '../../services/users.service';
import { Tarea } from '../../interfaces/tarea.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent implements OnInit {

  public frm!:FormGroup;
  private fb=inject(FormBuilder);
  public users: User[] = [];
  private serv_tareas = inject(TareasService);
  private serv_users = inject(UsersService);
  public tareas: Tarea[] = [];
  public stars: string[] = [];
  public selectedUser: string = "";

  ngOnInit(): void {
    this.getAllUsers();

    this.frm = this.fb.group({
      usuario: ['']
    });
  }

  getAllUsers():void {
    this.serv_users.getUsers().subscribe(
      res => {
        this.users = res;
        console.log(this.users)
      }
    )
  }

  getUserTasks():void{
    let id = this.frm.controls['usuario'].getRawValue();
    this.selectedUser = id;
    this.serv_tareas.getTareasByUser(id).subscribe(
      res=>{
        this.tareas = res;
      }
    )
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
