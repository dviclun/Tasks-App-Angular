import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';
import { TareasService } from '../../services/tareas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea } from '../../interfaces/tarea.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {

  public frm!:FormGroup;
  private fb=inject(FormBuilder);
  public usuarios: User[] = [];
  private users_service = inject(UsersService);
  private tareas_service = inject(TareasService);
  private _activedRouter=inject(ActivatedRoute);
  private _router=inject(Router);
  public id_tarea!:string;

  ngOnInit(): void {
    this.getUsers();

    this.frm=this.fb.group({
      _id: new FormControl({value:'', disabled:true}),
      titulo:['',Validators.required],
      descripcion:['',[Validators.required]],
      fecha:['',[Validators.required]],
      estado:['',[Validators.required,  Validators.pattern(/^(pendiente|completada|en progreso)$/)]],
      id_usuario:['',Validators.required],
      importancia:['',[Validators.required, Validators.pattern(/^(1|2|3|4|5)$/)]],
    })

    this._activedRouter.params.subscribe(
      params=>{
        this.id_tarea= params['id'];
        if (this.id_tarea){ //Si hay parametro se cargara la tarea en el formulario
         this.cargarTarea();
        }
      }
    )
  }

  getUsers():void{
    this.users_service.getUsers().subscribe(
      res => {
        this.usuarios = res;
      }
    )
  }


  grabarDatos():void{
    if(this.frm.controls['_id'].value===""){
      this.addTarea();
    }else{
      this.updateTarea();
    }
  }

  addTarea(){
    this.tareas_service.addTarea(this.frm.value).subscribe(
      res=>{
      console.log(res);
      if (res){
        console.log("Tarea guardada")
        this.frm.reset(); //limpiar el formulario
        this._router.navigate(['/listaTareas']);

      }else{
       console.log("Tarea no guardada")
      }

    })
  }

  updateTarea(){
    this.tareas_service.updateTarea(this.frm.value, this.id_tarea).subscribe(
      res=>{
      console.log(res);
      if (res){
        console.log("Tarea actualizada")
        this.frm.reset(); //limpiar el formulario
        this._router.navigate(['/listaTareas']);

      }else{
       console.log("Tarea no actualizada")
      }

    })
  }

   cargarTarea(){
     this.tareas_service.getTarea(this.id_tarea).subscribe(
      res => {
        if(res){
          this.frm.controls['_id'].setValue(res._id);
          this.frm.controls['titulo'].setValue(res.titulo);
          this.frm.controls['descripcion'].setValue(res.descripcion);
          this.frm.controls['fecha'].setValue(res.fecha);
          this.frm.controls['estado'].setValue(res.estado);
          this.frm.controls['id_usuario'].setValue(res.id_usuario);
          this.frm.controls['importancia'].setValue(res.importancia);
        }
      }
    )
  }
}
