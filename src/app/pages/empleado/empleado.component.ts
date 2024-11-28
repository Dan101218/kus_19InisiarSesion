import { Component, Input, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Router } from '@angular/router';
import { Empleado } from '../../Models/Empleado';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  @Input('id') idEmpleado!: number;
  private empleadoServicio = inject(EmpleadoService);
  public formBuild = inject(FormBuilder);

  public formEmpleado: FormGroup = this.formBuild.group({
    nombre: [''],
    anio: [0],
    horasacumuladas: [0],
    lugar: ['']
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.idEmpleado != 0) {
      this.empleadoServicio.obtener(this.idEmpleado).subscribe({
        next: (data) => {
          this.formEmpleado.patchValue({
            nombre: data.nombre,
            anio: data.anio,
            horasacumuladas: data.horasacumuladas,
            lugar: data.lugar
          });
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
  }

  guardar() {
    const objeto: Empleado = {
      idEmpleado: this.idEmpleado,
      nombre: this.formEmpleado.value.nombre,
      anio: this.formEmpleado.value.anio,
      horasacumuladas: this.formEmpleado.value.horasacumuladas,
      lugar: this.formEmpleado.value.lugar
    };

    if (this.idEmpleado == 0) {
      this.empleadoServicio.crear(objeto).subscribe({
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
      this.empleadoServicio.editar(objeto).subscribe({
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
}
