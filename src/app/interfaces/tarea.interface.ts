export interface Tarea {
  _id:string,
  titulo: string,
  descripcion: string,
  fecha: Date,
  estado: "pendiente" | "en progreso" | "completada",
  id_usuario: string,
  importancia: 1 | 2 | 3 | 4 | 5
}
