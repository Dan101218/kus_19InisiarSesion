import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../Models/Empleado';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio1',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './inicio1.component.html',
  styleUrls: ['./inicio1.component.css']
})
export class Inicio1Component {

  private empleadoServicio = inject(EmpleadoService);
  public listaEmpleados: Empleado[] = [];
  public filteredEmpleados: Empleado[] = []; // Lista filtrada
  public searchTerm: string = ''; // Término de búsqueda
  public displayedColumns: string[] = ['nombre', 'anio', 'horasacumuladas', 'lugar', 'accion'];

  constructor(private router: Router) {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadoServicio.lista().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaEmpleados = data;
          this.filteredEmpleados = data; // Inicializamos con todos los empleados
        }
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  nuevo() {
    this.router.navigate(['/empleado', 0]);
  }

  editar(objeto: Empleado) {
    this.router.navigate(['/empleado', objeto.idEmpleado]);
  }

  eliminar(objeto: Empleado) {
    if (confirm("Desea eliminar el empleado " + objeto.nombre)) {
      this.empleadoServicio.eliminar(objeto.idEmpleado).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.obtenerEmpleados();
          } else {
            alert("No se pudo eliminar");
          }
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
  }

  filterEmpleados() {
    this.filteredEmpleados = this.listaEmpleados.filter((empleado) =>
      empleado.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      empleado.anio.toString().includes(this.searchTerm)
    );
  }
}
