import { Component } from '@angular/core';
import { Inicio1Component } from "../pages/inicio1/inicio1.component";
import { EmpleadoComponent } from "../pages/empleado/empleado.component";
import { Inicio2Component } from "../pages/inicio2/inicio2.component";
import { directoraComponent } from "../pages/directora/directora.component";
import { Inicio3Component } from "../pages/inicio3/inicio3.component";
import { CoordiandorComponent } from "../pages/coordinador/coordinador.component";
import { DialogModule } from 'primeng/dialog';
import { LoginComponent } from "../pages/login/login.component";

@Component({
  selector: 'app-unir',
  standalone: true,
  imports: [
    Inicio1Component,
    EmpleadoComponent,
    Inicio2Component,
    directoraComponent,
    Inicio3Component,
    CoordiandorComponent,
    DialogModule,
    LoginComponent
],
  templateUrl: './unir.component.html',
  styleUrls: ['./unir.component.css']
})
export class UnirComponent {
  // Controla la visibilidad del diálogo
  display: boolean = false;

  // Método para abrir el diálogo
  showDialog() {
    this.display = true;
  }

  // Método para cerrar el diálogo
  hideDialog() {
    this.display = false;
  }

}
