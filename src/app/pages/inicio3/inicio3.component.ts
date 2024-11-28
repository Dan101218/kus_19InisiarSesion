import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CoordiandorService } from '../../services/coordinador.service';
import { Coordinador } from '../../Models/Coordinador';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio3',
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
  templateUrl: './inicio3.component.html',
  styleUrls: ['./inicio3.component.css']
})
export class Inicio3Component {

  private coordinadorServicio = inject(CoordiandorService);
  public listaCoordinadores: Coordinador[] = [];
  public filteredCoordinadores: Coordinador[] = []; // Lista filtrada
  public searchTerm: string = ''; // Término de búsqueda
  public displayedColumns: string[] = ['nombre', 'anio', 'desempeño', 'linea', 'accion'];

  constructor(private router: Router) {
    this.obtenerCoordinadores();
  }

  obtenerCoordinadores() {
    this.coordinadorServicio.lista().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaCoordinadores = data;
          this.filteredCoordinadores = data; // Inicializamos con todos los empleados
        }
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  nuevo() {
    this.router.navigate(['/coordinador', 0]);
  }

  editar(objeto: Coordinador) {
    this.router.navigate(['/coordinador', objeto.idCoordinador]);
  }

  eliminar(objeto: Coordinador) {
    if (confirm("Desea eliminar el coordinador " + objeto.nombre)) {
      this.coordinadorServicio.eliminar(objeto.idCoordinador).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.obtenerCoordinadores();
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

  filterCoordianres() {
    this.filteredCoordinadores = this.listaCoordinadores.filter((coordinador) =>
      coordinador.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      coordinador.anio.toString().includes(this.searchTerm)
    );
  }
}
