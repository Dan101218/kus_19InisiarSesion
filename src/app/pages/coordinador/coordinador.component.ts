import { Component, Input, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CoordiandorService } from '../../services/coordinador.service';
import { Router } from '@angular/router';
import { Coordinador } from '../../Models/Coordinador';

@Component({
  selector: 'app-coordinador',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    CommonModule // Agregado para habilitar *ngIf
  ],
  templateUrl: './coordinador.component.html',
  styleUrls: ['./coordinador.component.css']
})
export class CoordiandorComponent implements OnInit {

  @Input('id') idCoordinador!: number;
  private coordinadorServicio = inject(CoordiandorService);
  public formBuild = inject(FormBuilder);

  public formCoordinador: FormGroup = this.formBuild.group({
    nombre: [''],
    anio: [0],
    desempenio: [''],
    linea: ['']
  });

  public uploadProgress: number = 0; // Variable para el progreso de carga
  public fileToUpload: File | null = null; // Archivo seleccionado

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.idCoordinador != 0) {
      this.coordinadorServicio.obtener(this.idCoordinador).subscribe({
        next: (data) => {
          this.formCoordinador.patchValue({
            nombre: data.nombre,
            anio: data.anio,
            desempenio: data.desempenio,
            linea: data.linea
          });
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
  }

  guardar() {
    const objeto: Coordinador = {
      idCoordinador: this.idCoordinador,
      nombre: this.formCoordinador.value.nombre,
      anio: this.formCoordinador.value.anio,
      desempenio: this.formCoordinador.value.desempenio,
      linea: this.formCoordinador.value.linea
    };

    if (this.idCoordinador == 0) {
      this.coordinadorServicio.crear(objeto).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(["/"]);
          } else {
            alert("Error al crear");
          }
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    } else {
      this.coordinadorServicio.editar(objeto).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(["/"]);
          } else {
            alert("Error al editar");
          }
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
  }

  volver() {
    this.router.navigate(["/"]);
  }

  // Método para manejar la selección de archivo
  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  // Método para cargar archivo con seguimiento de progreso
  subirArchivo() {
    if (this.fileToUpload) {
      this.coordinadorServicio.subirArchivo(this.fileToUpload).subscribe({
        next: (progress) => {
          this.uploadProgress = progress; // Actualizar progreso
        },
        error: (err) => {
          console.log('Error al subir archivo:', err.message);
        }
      });
    } else {
      alert("Por favor, seleccione un archivo.");
    }
  }
}

