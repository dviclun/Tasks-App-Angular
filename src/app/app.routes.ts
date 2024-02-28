import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadComponent: ()=> import("./components/home/home.component").then(c => c.HomeComponent),
  },
  {
    path: "listaTareas",
    loadComponent: ()=> import("./components/tasks-list/tasks-list.component").then(c => c.TasksListComponent)
  },
  {
    path: "tareas/:estado",
    loadComponent: ()=> import("./components/tasks/tasks.component").then(c => c.TasksComponent)
  },
  {
    path: "tareasUsuario",
    loadComponent: ()=> import("./components/user-tasks/user-tasks.component").then(c => c.UserTasksComponent)
  },
  {
    path: "tarea-form",
    loadComponent: ()=> import("./components/task-form/task-form.component").then(c => c.TaskFormComponent)
  },
  {
    path: "tarea-form/:id",
    loadComponent: ()=> import("./components/task-form/task-form.component").then(c => c.TaskFormComponent)
  },
  {
    path: "**",
    redirectTo: "home"
  }
];
