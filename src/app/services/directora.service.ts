import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Directora } from '../Models/Directora';
import { ResponseAPI } from '../Models/ResponseAPI';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DirectoraService {

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "Directora";

  constructor() { }

  lista() {
    return this.http.get<Directora[]>(this.apiUrl);
  }

  obtener(id: number) {
    return this.http.get<Directora>(`${this.apiUrl}/${id}`);
  }

  crear(objeto: Directora) {
    return this.http.post<ResponseAPI>(this.apiUrl, objeto);
  }

  editar(objeto: Directora) {
    return this.http.put<ResponseAPI>(this.apiUrl, objeto);
  }

  eliminar(id: number) {
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }

  // Método para subir archivos con seguimiento de progreso
  subirArchivo(archivo: File): Observable<number> {
    const formData = new FormData();
    formData.append('file', archivo);

    return this.http.post(`${this.apiUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({ 'enctype': 'multipart/form-data' })
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            // Calcula el progreso
            return Math.round((event.loaded / (event.total || 1)) * 100);
          case HttpEventType.Response:
            // Respuesta final
            return 100; // Indica que la carga está completa
          default:
            return 0; // Progreso inicial
        }
      })
    );
  }
}
