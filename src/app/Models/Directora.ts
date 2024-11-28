export interface Directora {
    idDirectora: number;
    nombre: string;
    anio: string;
    desempenio: string;
    linea: string;

    // Campos para la carga de archivos
    file?: File; // Archivo seleccionado para subir
    uploadProgress?: number; // Progreso de la carga (en porcentaje)
    uploadedUrl?: string; // URL del archivo subido (si se necesita guardar la referencia)
}
