import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DirectoraService } from '../../services/directora.service';
import { Directora } from '../../Models/Directora';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-inicio2',
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
  templateUrl: './inicio2.component.html',
  styleUrls: ['./inicio2.component.css']
})
export class Inicio2Component {

  private directoraServicio = inject(DirectoraService);
  public listaDirectora: Directora[] = [];
  public filteredDirectora: Directora[] = []; // Lista filtrada
  public searchTerm: string = ''; // Término de búsqueda
  public displayedColumns: string[] = ['nombre', 'anio', 'desempeño', 'linea', 'accion'];

  constructor(private router: Router) {
    this.obtenerDirectoras();
  }

  obtenerDirectoras() {
    this.directoraServicio.lista().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaDirectora = data;
          this.filteredDirectora = data; // Inicializamos con todos los empleados
        }
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  nuevo() {
    this.router.navigate(['/directora', 0]);
  }

  editar(objeto: Directora) {
    this.router.navigate(['/directora', objeto.idDirectora]);
  }

  eliminar(objeto: Directora) {
    if (confirm("Desea eliminar la directora " + objeto.nombre)) {
      this.directoraServicio.eliminar(objeto.idDirectora).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.obtenerDirectoras();
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

  filterDirectoras() {
    this.filteredDirectora = this.listaDirectora.filter((directora) =>
      directora.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      directora.anio.toString().includes(this.searchTerm)
    );
  }
}