import { Component, Input, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DirectoraService } from '../../services/directora.service';
import { Router } from '@angular/router';
import { Directora } from '../../Models/Directora';

@Component({
  selector: 'app-directora',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    CommonModule // Agregado para habilitar *ngIf
  ],
  templateUrl: './directora.component.html',
  styleUrls: ['./directora.component.css']
})
export class directoraComponent implements OnInit {

  @Input('id') idDirectora!: number;
  private directoraServicio = inject(DirectoraService);
  public formBuild = inject(FormBuilder);

  public formDirectora: FormGroup = this.formBuild.group({
    nombre: [''],
    anio: [0],
    desempenio: [''],
    linea: ['']
  });

  public uploadProgress: number = 0; // Variable para el progreso de carga
  public fileToUpload: File | null = null; // Archivo seleccionado

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.idDirectora != 0) {
      this.directoraServicio.obtener(this.idDirectora).subscribe({
        next: (data) => {
          this.formDirectora.patchValue({
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
    const objeto: Directora = {
      idDirectora: this.idDirectora,
      nombre: this.formDirectora.value.nombre,
      anio: this.formDirectora.value.anio,
      desempenio: this.formDirectora.value.desempenio,
      linea: this.formDirectora.value.linea
    };

    if (this.idDirectora == 0) {
      this.directoraServicio.crear(objeto).subscribe({
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
      this.directoraServicio.editar(objeto).subscribe({
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
      this.directoraServicio.subirArchivo(this.fileToUpload).subscribe({
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

