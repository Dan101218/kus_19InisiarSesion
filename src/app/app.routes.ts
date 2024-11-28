import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { authGuard } from './custom/auth.guard';
import { directoraComponent } from './pages/directora/directora.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { Inicio1Component } from './pages/inicio1/inicio1.component';
import { Inicio2Component } from './pages/inicio2/inicio2.component';
import { Inicio3Component } from './pages/inicio3/inicio3.component';
import { CoordiandorComponent } from './pages/coordinador/coordinador.component';
import { UnirComponent } from './unir/unir.component';
import { HomeComponent } from './pages/home1/home.component';


export const routes: Routes = [
     {path:"", component:LoginComponent},
     {path:"inicio1",component:Inicio1Component},
     {path:"home1",component:HomeComponent},
     {path:"empleado",component:EmpleadoComponent},
     {path:"inicio2",component:Inicio2Component},
     {path:"directora",component:directoraComponent},
     {path:"inicio3",component:Inicio3Component},
     {path:"coordinador",component:CoordiandorComponent},
     {path:"registro", component:RegistroComponent},
     {path:"unir", component:UnirComponent, title:"percy"},
     {path:"", component:LoginComponent,canActivate:[authGuard]},
];
