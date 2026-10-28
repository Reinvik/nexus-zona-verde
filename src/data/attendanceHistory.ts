import { OperatorItem, AttendanceRecord, AttendanceStatus, ShiftType } from '../types';

export const HISTORICAL_DATE_KEYS: string[] = ["2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04", "2026-01-05", "2026-01-06", "2026-01-07", "2026-01-08", "2026-01-09", "2026-01-10", "2026-01-11", "2026-01-12", "2026-01-13", "2026-01-14", "2026-01-15", "2026-01-16", "2026-01-17", "2026-01-18", "2026-01-19", "2026-01-20", "2026-01-21", "2026-01-22", "2026-01-23", "2026-01-24", "2026-01-25", "2026-01-26", "2026-01-27", "2026-01-28", "2026-01-29", "2026-01-30", "2026-01-31", "2026-02-01", "2026-02-02", "2026-02-03", "2026-02-04", "2026-02-05", "2026-02-06", "2026-02-07", "2026-02-08", "2026-02-09", "2026-02-10", "2026-02-11", "2026-02-12", "2026-02-13", "2026-02-14", "2026-02-15", "2026-02-16", "2026-02-17", "2026-02-18", "2026-02-19", "2026-02-20", "2026-02-21", "2026-02-22", "2026-02-23", "2026-02-24", "2026-02-25", "2026-02-26", "2026-02-27", "2026-02-28", "2026-03-01", "2026-03-02", "2026-03-03", "2026-03-04", "2026-03-05", "2026-03-06", "2026-03-07", "2026-03-08", "2026-03-09", "2026-03-10", "2026-03-11", "2026-03-12", "2026-03-13", "2026-03-14", "2026-03-15", "2026-03-16", "2026-03-17", "2026-03-18", "2026-03-19", "2026-03-20", "2026-03-21", "2026-03-22", "2026-03-23", "2026-03-24", "2026-03-25", "2026-03-26", "2026-03-27", "2026-03-28", "2026-03-29", "2026-03-30", "2026-03-31", "2026-04-01", "2026-04-02", "2026-04-03", "2026-04-04", "2026-04-05", "2026-04-06", "2026-04-07", "2026-04-08", "2026-04-09", "2026-04-10", "2026-04-11", "2026-04-12", "2026-04-13", "2026-04-14", "2026-04-15", "2026-04-16", "2026-04-17", "2026-04-18", "2026-04-19", "2026-04-20", "2026-04-21", "2026-04-22", "2026-04-23", "2026-04-24", "2026-04-25", "2026-04-26", "2026-04-27", "2026-04-28", "2026-04-29", "2026-04-30", "2026-05-01", "2026-05-02", "2026-05-03", "2026-05-04", "2026-05-05", "2026-05-06", "2026-05-07", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-11", "2026-05-12", "2026-05-13", "2026-05-14", "2026-05-15", "2026-05-16", "2026-05-17", "2026-05-18", "2026-05-19", "2026-05-20", "2026-05-21", "2026-05-22", "2026-05-23", "2026-05-24", "2026-05-25", "2026-05-26", "2026-05-27", "2026-05-28", "2026-05-29", "2026-05-30", "2026-05-31", "2026-06-01", "2026-06-02", "2026-06-03", "2026-06-04", "2026-06-05", "2026-06-06", "2026-06-07", "2026-06-08", "2026-06-09", "2026-06-10", "2026-06-11", "2026-06-12", "2026-06-13", "2026-06-14", "2026-06-15", "2026-06-16", "2026-06-17", "2026-06-18", "2026-06-19", "2026-06-20", "2026-06-21", "2026-06-22", "2026-06-23", "2026-06-24", "2026-06-25", "2026-06-26", "2026-06-27", "2026-06-28", "2026-06-29", "2026-06-30", "2026-07-01", "2026-07-02", "2026-07-03", "2026-07-04", "2026-07-05", "2026-07-06", "2026-07-07", "2026-07-08", "2026-07-09", "2026-07-10", "2026-07-11", "2026-07-12", "2026-07-13", "2026-07-14", "2026-07-15", "2026-07-16", "2026-07-17", "2026-07-18", "2026-07-19", "2026-07-20", "2026-07-21", "2026-07-22", "2026-07-23", "2026-07-24", "2026-07-25", "2026-07-26", "2026-07-27", "2026-07-28", "2026-07-29", "2026-07-30", "2026-07-31", "2026-08-01", "2026-08-02", "2026-08-03", "2026-08-04", "2026-08-05", "2026-08-06", "2026-08-07", "2026-08-08", "2026-08-09", "2026-08-10", "2026-08-11", "2026-08-12", "2026-08-13", "2026-08-14", "2026-08-15", "2026-08-16", "2026-08-17", "2026-08-18", "2026-08-19", "2026-08-20", "2026-08-21", "2026-08-22", "2026-08-23", "2026-08-24", "2026-08-25", "2026-08-26", "2026-08-27", "2026-08-28", "2026-08-29", "2026-08-30", "2026-08-31", "2026-09-01", "2026-09-02", "2026-09-03", "2026-09-04", "2026-09-05", "2026-09-06", "2026-09-07", "2026-09-08", "2026-09-09", "2026-09-10", "2026-09-11", "2026-09-12", "2026-09-13", "2026-09-14", "2026-09-15", "2026-09-16", "2026-09-17", "2026-09-18", "2026-09-19", "2026-09-20", "2026-09-21", "2026-09-22", "2026-09-23", "2026-09-24", "2026-09-25", "2026-09-26", "2026-09-27", "2026-09-28", "2026-09-29", "2026-09-30", "2026-10-01", "2026-10-02", "2026-10-03", "2026-10-04", "2026-10-05", "2026-10-06", "2026-10-07", "2026-10-08", "2026-10-09", "2026-10-10", "2026-10-11", "2026-10-12", "2026-10-13", "2026-10-14", "2026-10-15", "2026-10-16", "2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20", "2026-10-21", "2026-10-22", "2026-10-23", "2026-10-24", "2026-10-25", "2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30", "2026-10-31"];
export const HISTORICAL_HEADER_DAYS: string[] = ["01-ene", "02-ene", "03-ene", "04-ene", "05-ene", "06-ene", "07-ene", "08-ene", "09-ene", "10-ene", "11-ene", "12-ene", "13-ene", "14-ene", "15-ene", "16-ene", "17-ene", "18-ene", "19-ene", "20-ene", "21-ene", "22-ene", "23-ene", "24-ene", "25-ene", "26-ene", "27-ene", "28-ene", "29-ene", "30-ene", "31-ene", "01-feb", "02-feb", "03-feb", "04-feb", "05-feb", "06-feb", "07-feb", "08-feb", "09-feb", "10-feb", "11-feb", "12-feb", "13-feb", "14-feb", "15-feb", "16-feb", "17-feb", "18-feb", "19-feb", "20-feb", "21-feb", "22-feb", "23-feb", "24-feb", "25-feb", "26-feb", "27-feb", "28-feb", "01-mar", "02-mar", "03-mar", "04-mar", "05-mar", "06-mar", "07-mar", "08-mar", "09-mar", "10-mar", "11-mar", "12-mar", "13-mar", "14-mar", "15-mar", "16-mar", "17-mar", "18-mar", "19-mar", "20-mar", "21-mar", "22-mar", "23-mar", "24-mar", "25-mar", "26-mar", "27-mar", "28-mar", "29-mar", "30-mar", "31-mar", "01-abr", "02-abr", "03-abr", "04-abr", "05-abr", "06-abr", "07-abr", "08-abr", "09-abr", "10-abr", "11-abr", "12-abr", "13-abr", "14-abr", "15-abr", "16-abr", "17-abr", "18-abr", "19-abr", "20-abr", "21-abr", "22-abr", "23-abr", "24-abr", "25-abr", "26-abr", "27-abr", "28-abr", "29-abr", "30-abr", "01-may", "02-may", "03-may", "04-may", "05-may", "06-may", "07-may", "08-may", "09-may", "10-may", "11-may", "12-may", "13-may", "14-may", "15-may", "16-may", "17-may", "18-may", "19-may", "20-may", "21-may", "22-may", "23-may", "24-may", "25-may", "26-may", "27-may", "28-may", "29-may", "30-may", "31-may", "01-jun", "02-jun", "03-jun", "04-jun", "05-jun", "06-jun", "07-jun", "08-jun", "09-jun", "10-jun", "11-jun", "12-jun", "13-jun", "14-jun", "15-jun", "16-jun", "17-jun", "18-jun", "19-jun", "20-jun", "21-jun", "22-jun", "23-jun", "24-jun", "25-jun", "26-jun", "27-jun", "28-jun", "29-jun", "30-jun", "01-jul", "02-jul", "03-jul", "04-jul", "05-jul", "06-jul", "07-jul", "08-jul", "09-jul", "10-jul", "11-jul", "12-jul", "13-jul", "14-jul", "15-jul", "16-jul", "17-jul", "18-jul", "19-jul", "20-jul", "21-jul", "22-jul", "23-jul", "24-jul", "25-jul", "26-jul", "27-jul", "28-jul", "29-jul", "30-jul", "31-jul", "01-ago", "02-ago", "03-ago", "04-ago", "05-ago", "06-ago", "07-ago", "08-ago", "09-ago", "10-ago", "11-ago", "12-ago", "13-ago", "14-ago", "15-ago", "16-ago", "17-ago", "18-ago", "19-ago", "20-ago", "21-ago", "22-ago", "23-ago", "24-ago", "25-ago", "26-ago", "27-ago", "28-ago", "29-ago", "30-ago", "31-ago", "01-sept", "02-sept", "03-sept", "04-sept", "05-sept", "06-sept", "07-sept", "08-sept", "09-sept", "10-sept", "11-sept", "12-sept", "13-sept", "14-sept", "15-sept", "16-sept", "17-sept", "18-sept", "19-sept", "20-sept", "21-sept", "22-sept", "23-sept", "24-sept", "25-sept", "26-sept", "27-sept", "28-sept", "29-sept", "30-sept", "01-oct", "02-oct", "03-oct", "04-oct", "05-oct", "06-oct", "07-oct", "08-oct", "09-oct", "10-oct", "11-oct", "12-oct", "13-oct", "14-oct", "15-oct", "16-oct", "17-oct", "18-oct", "19-oct", "20-oct", "21-oct", "22-oct", "23-oct", "24-oct", "25-oct", "26-oct", "27-oct", "28-oct", "29-oct", "30-oct", "31-oct"];

export const REAL_OPERATORS: OperatorItem[] = [
  {
    "id": "op-1",
    "name": "Fuentes Cabrera Luis Enrique",
    "rut": "24.209.656-8",
    "role": "ASISTENTE DE DESPACHO 2",
    "area": "Andenes de Despacho",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Walter Sánchez",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-2",
    "name": "Contreras Ulloa Matias Nicolas",
    "rut": "21.660.461-k",
    "role": "ENCAJADO",
    "area": "Encajado Frío",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Mayckell Pereira",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-3",
    "name": "Castro Rodriguez Sally Cristi",
    "rut": "9.905.053-5",
    "role": "ASISTENTE DE DESPACHO 2",
    "area": "Andenes de Despacho",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Walter Sánchez",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-4",
    "name": "Castillo Oses Manuel Gerardo",
    "rut": "10.004.767-5",
    "role": "ASISTENTE DE DESPACHO 2",
    "area": "Andenes de Despacho",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Walter Sánchez",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-5",
    "name": "Arteaga Rosas Jaime Gabriel",
    "rut": "10.288.918-5",
    "role": "ASISTENTE DE DESPACHO 2",
    "area": "Andenes de Despacho",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Walter Sánchez",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-6",
    "name": "Bustamante Espinoza Cristobal Benjamin",
    "rut": "22.383.311-k",
    "role": "ASISTENTE DE DESPACHO 2",
    "area": "Andenes de Despacho",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Mayckell Pereira",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-7",
    "name": "Ramirez Reyes Jorge Wladimir",
    "rut": "19.584.706-1",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-8",
    "name": "Palma Bustamante Matías Nicolás",
    "rut": "19.800.436-7",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-9",
    "name": "Muñoz Aburto Felipe Ignacio",
    "rut": "18.357.176-1",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-10",
    "name": "Azuaje Gonzalez Erick Anthony",
    "rut": "26.778.978-9",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-11",
    "name": "Yañez Garcia Cristian Andres",
    "rut": "25.760.308-3",
    "role": "ENCAJADO",
    "area": "Encajado Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-12",
    "name": "Valenzuela Correa Diego Arman",
    "rut": "16.432.607-1",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-13",
    "name": "Valdez Fernandez Rodrigo Ignacio",
    "rut": "20.592.651-8",
    "role": "ASISTENTE DE DESPACHO 3",
    "area": "Andenes de Despacho",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Mayckell Pereira",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-14",
    "name": "Soto Toro Claudio Reinaldo",
    "rut": "12.260.633-3",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-15",
    "name": "Sepulveda Villarroel Claudio",
    "rut": "11.960.037-5",
    "role": "SUPERVISOR DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-16",
    "name": "Zuñiga Oyarce Alfredo Fernando",
    "rut": "14.256.894-2",
    "role": "TRANSPALETERO 1",
    "area": "Staging / Transpaletas",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-17",
    "name": "Rubio Nuñez Jacob Alexis",
    "rut": "18.089.543-4",
    "role": "ASISTENTE DE DESPACHO 3",
    "area": "Andenes de Despacho",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Mayckell Pereira",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-18",
    "name": "Rodriguez Carruyo Johandry Jose",
    "rut": "26.771.973-k",
    "role": "ASISTENTE DE DESPACHO 3",
    "area": "Andenes de Despacho",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Mayckell Pereira",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-19",
    "name": "Ramirez Varas Adrian Benjamin",
    "rut": "21.405.089-7",
    "role": "ASISTENTE DE DESPACHO 3",
    "area": "Andenes de Despacho",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Mayckell Pereira",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-20",
    "name": "Santelices Correa Jaime Ferna",
    "rut": "17.739.507-2",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-21",
    "name": "Jn Baptiste Mirassaint",
    "rut": "25.517.790-7",
    "role": "GRUERO 1",
    "area": "Grúas / Almacenamiento",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-22",
    "name": "Pereira Aranguren Mayckell Alberto",
    "rut": "26.082.752-9",
    "role": "SUPERVISOR DE DESPACHO 3",
    "area": "Andenes de Despacho",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Euro Velasquez",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-23",
    "name": "Pardo Nuñez Mario Andres",
    "rut": "6.261.920-1",
    "role": "ENCAJADO",
    "area": "Encajado Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-24",
    "name": "Saavedra Puelles Nelson Tomas",
    "rut": "24.171.406-3",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-25",
    "name": "Osorio Cristancho Daniel David",
    "rut": "27.461.857-4",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-26",
    "name": "Sanchez Ceballos Cristian Alejandro",
    "rut": "21.452.069-9",
    "role": "ASISTENTE DE DESPACHO 1",
    "area": "Andenes de Despacho",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Nelson Brito",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-27",
    "name": "Miranda Jara Carlos Antonio",
    "rut": "20.389.503-8",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-28",
    "name": "Mendez Ubinazo Gustavo Aroldo",
    "rut": "11.320.983-6",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-29",
    "name": "Neira Flores Anyelo Bernabe",
    "rut": "19.198.976-7",
    "role": "ASISTENTE DE DESPACHO 1",
    "area": "Andenes de Despacho",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Nelson Brito",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-30",
    "name": "Maureira Mora Eduardo Andres",
    "rut": "16.447.209-4",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-31",
    "name": "Moraga Fernandez Fabian Angel",
    "rut": "15.604.349-4",
    "role": "ASISTENTE DE DESPACHO 2",
    "area": "Andenes de Despacho",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Walter Sánchez",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-32",
    "name": "Guzman Perez Carlos Fernando",
    "rut": "10.677.622-9",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-33",
    "name": "Heredia Morales Ramon",
    "rut": "9.788.260-6",
    "role": "TRANSPALETERO 1",
    "area": "Staging / Transpaletas",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-34",
    "name": "Nome Barra Gustavo Estefan",
    "rut": "21.176.023-0",
    "role": "ASISTENTE DE DESPACHO 1",
    "area": "Andenes de Despacho",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Nelson Brito",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-35",
    "name": "Meriño Muñoz Bryan Patricio",
    "rut": "20.055.370-5",
    "role": "ASISTENTE DE DESPACHO 2",
    "area": "Andenes de Despacho",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Walter Sánchez",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-36",
    "name": "Cipiran Castro Eduardo Martin",
    "rut": "25.925.511-2",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-37",
    "name": "Castro Yañez Leandro Rogelio",
    "rut": "19.500.193-6",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-38",
    "name": "Bustos Cadagan Eduardo Ernesto",
    "rut": "12.683.776-3",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-39",
    "name": "Madrid Villanueva Bastian Alonso",
    "rut": "20.951.148-7",
    "role": "ASISTENTE DE DESPACHO 2",
    "area": "Andenes de Despacho",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Walter Sánchez",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-40",
    "name": "Hermosilla Perez Kevin Alexis",
    "rut": "20.139.208-k",
    "role": "GRUERO 1",
    "area": "Grúas / Almacenamiento",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-41",
    "name": "Leon Leon Dunel",
    "rut": "26.571.692-K",
    "role": "ENCAJADO",
    "area": "Encajado Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-42",
    "name": "Mella Olivares Mateo Ismael",
    "rut": "21.886.156-3",
    "role": "ASISTENTE DE DESPACHO 1",
    "area": "Andenes de Despacho",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Nelson Brito",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-43",
    "name": "Avendaño Carrascal Ricardo Andres",
    "rut": "27.130.293-2",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-44",
    "name": "Inostroza Landeros Luis Brayan",
    "rut": "20.812.797-7",
    "role": "ASISTENTE DE DESPACHO 2",
    "area": "Andenes de Despacho",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Walter Sánchez",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-45",
    "name": "Hueicha Lincocheo Julio Andre",
    "rut": "21.415.000-K",
    "role": "COORDINADOR DE PATIO 3",
    "area": "Patio Inbound / Recepción",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Mayckell Pereira",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-46",
    "name": "San Martin Botello Gonzalo Exeequiel",
    "rut": "17.942.329-4",
    "role": "GRUERO 1",
    "area": "Grúas / Almacenamiento",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-47",
    "name": "Hernandez Mora Cristian Carlos",
    "rut": "17.187.722-9",
    "role": "SUPERVISOR DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-48",
    "name": "Roosvelt Denis",
    "rut": "22.815.757-0",
    "role": "GRUERO 1",
    "area": "Grúas / Almacenamiento",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-49",
    "name": "Arevalo Gavilan Jose Eduardo",
    "rut": "18.513.634-5",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-50",
    "name": "Gutierrez Gayardo Evelyn Soledad",
    "rut": "13.260.577-7",
    "role": "ENCAJADO",
    "area": "Encajado Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-51",
    "name": "Quijada Cifuentes Juan Carlos",
    "rut": "10.309.397-K",
    "role": "GRUERO 2",
    "area": "Grúas / Almacenamiento",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-52",
    "name": "Guajardo Díaz Daniel Nicolás",
    "rut": "16.955.702-0",
    "role": "ASISTENTE DE DESPACHO 2",
    "area": "Andenes de Despacho",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Walter Sánchez",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-53",
    "name": "Fernandez Vera Guillermo Albe",
    "rut": "11.486.919-8",
    "role": "TRANSPALETERO 1",
    "area": "Staging / Transpaletas",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-54",
    "name": "Tuggener Carinao Franco Orlando",
    "rut": "18.731.886-6",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-55",
    "name": "Flores Moraga Jorge Antonio",
    "rut": "12.510.382-0",
    "role": "ASISTENTE DE DESPACHO 2",
    "area": "Andenes de Despacho",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Walter Sánchez",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-56",
    "name": "Lewens Ocares Juan Pablo",
    "rut": "15.587.087-7",
    "role": "GRUERO 1",
    "area": "Grúas / Almacenamiento",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-57",
    "name": "Varas Uribe Antonio Andres",
    "rut": "16.953.095-5",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-58",
    "name": "Euro Jose Velasquez Eriza",
    "rut": "26.650.185-4",
    "role": "JEFE DE TURNO 3",
    "area": "Jefatura de Turno",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Euro Velasquez",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-59",
    "name": "Fuentes Fuentes Ignacio Aleja",
    "rut": "20.335.923-3",
    "role": "TRANSPALETERO 2",
    "area": "Staging / Transpaletas",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-60",
    "name": "Escobar Salinas Felipe Eduardo",
    "rut": "18.838.823-K",
    "role": "ASISTENTE DE DESPACHO 2",
    "area": "Andenes de Despacho",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Walter Sánchez",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-61",
    "name": "Lara Reynao Francisco Aurelio",
    "rut": "11.882.838-0",
    "role": "JEFE DE TURNO 2",
    "area": "Jefatura de Turno",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Francisco Lara",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-62",
    "name": "Ortega Blas Roberto Carlos",
    "rut": "14.677.176-9",
    "role": "TRANSPALETERO 2",
    "area": "Staging / Transpaletas",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-63",
    "name": "Serrano Jopia Felipe Nicolas",
    "rut": "18.907.718-1",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-64",
    "name": "Oliveros Jacanamijoy Diego An",
    "rut": "26.038.826-6",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-65",
    "name": "Moraga Cifuentes Victor Gabri",
    "rut": "15.480.762-4",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-66",
    "name": "Marquez Rago Eduardo Andres",
    "rut": "18.832.381-2",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-67",
    "name": "Camus Roa Michael Andres",
    "rut": "20.147.823-5",
    "role": "ASISTENTE DE DESPACHO 3",
    "area": "Andenes de Despacho",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Nelson Brito",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-68",
    "name": "Gutierrez Yevenes Gregorio De",
    "rut": "15.879.825-5",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-69",
    "name": "Gutierrez Campos Orlando Enri",
    "rut": "10.863.467-7",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-70",
    "name": "Brito Frias Nelson Antonio",
    "rut": "15.956.047-3",
    "role": "SUPERVISOR DE DESPACHO 3",
    "area": "Andenes de Despacho",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Nelson Brito",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-71",
    "name": "Farias Contreras Boris Rodrig",
    "rut": "13.042.759-6",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-72",
    "name": "Barrios Salazar Guillermo Antonio",
    "rut": "12.645.222-5",
    "role": "ASISTENTE DE DESPACHO 3",
    "area": "Andenes de Despacho",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Mayckell Pereira",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-73",
    "name": "Castro Tapia Juan Bautista",
    "rut": "10.513.027-9",
    "role": "ASISTENTE DE PICKING 1",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-74",
    "name": "Castillo Vega Américo Jesús",
    "rut": "19.092.385-1",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-75",
    "name": "Carrasco Donoso Eduardo Rafael",
    "rut": "10.163.991-6",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-76",
    "name": "Canales Calderon Cristian Luis",
    "rut": "8.531.628-1",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-77",
    "name": "Bustamante Lamas Patricio Arm",
    "rut": "9.217.892-7",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-78",
    "name": "Arrieta Stuart Patricio Camilo",
    "rut": "18.115.357-1",
    "role": "ASISTENTE DE DESPACHO 2",
    "area": "Andenes de Despacho",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Walter Sánchez",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-79",
    "name": "Aravena Araya Ignacio Esteban",
    "rut": "19.583.358-3",
    "role": "ENCAJADO",
    "area": "Encajado Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-80",
    "name": "Bravo Bravo Alejandro Ernesto",
    "rut": "19.285.848-8",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-81",
    "name": "Alcapan Bustamante Francisco Efrain",
    "rut": "19.062.833-7",
    "role": "ASISTENTE DE DESPACHO 3",
    "area": "Andenes de Despacho",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Mayckell Pereira",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-82",
    "name": "Asencios Zevallos Jorge Luis",
    "rut": "22.606.751-5",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-83",
    "name": "Guerrero Gonzalez Juan Bautista",
    "rut": "16.724.984-1",
    "role": "GRUERO 2",
    "area": "Grúas / Almacenamiento",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-84",
    "name": "Asencios Zevallos Hugo Ricardo",
    "rut": "22.368.957-4",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-85",
    "name": "Castillo Huerta Fabián Esteban",
    "rut": "13.565.228-8",
    "role": "TRANSPALETERO 2",
    "area": "Staging / Transpaletas",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-86",
    "name": "Alvarado Caniu Victor Eduardo",
    "rut": "16.382.159-1",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-87",
    "name": "Pérez Benavides Manuel Jesús",
    "rut": "18.329.576-4",
    "role": "ASISTENTE DE DESPACHO 3",
    "area": "Andenes de Despacho",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Mayckell Pereira",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-88",
    "name": "Sanchez Navarro Walter Gustavo",
    "rut": "24.673.345-7",
    "role": "SUPERVISOR DE DESPACHO 1",
    "area": "Andenes de Despacho",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Francisco Lara",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-89",
    "name": "Arredondo Bravo Hugo Ernesto",
    "rut": "13.680.238-0",
    "role": "ASISTENTE DE DESPACHO 1",
    "area": "Andenes de Despacho",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Nelson Brito",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-90",
    "name": "Galleguillos Anchil Oscar Josue",
    "rut": "20.451.305-8",
    "role": "ASISTENTE DE DESPACHO 3",
    "area": "Andenes de Despacho",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Mayckell Pereira",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-91",
    "name": "Retamal Alvarez Fernando  Patricio",
    "rut": "18.538.977-4",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-92",
    "name": "Cifuentes Romero Rigoberto",
    "rut": "15.513.686-3",
    "role": "GRUERO 2",
    "area": "Grúas / Almacenamiento",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-93",
    "name": "Salas Muñoz Christian Fernando",
    "rut": "19.528.603-5",
    "role": "ASISTENTE REPALETIZADO",
    "area": "Repaletizado / Reacondicionamiento",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-94",
    "name": "Martinez Sepulveda Eusebio",
    "rut": "18.326.570-9",
    "role": "ASISTENTE REPALETIZADO",
    "area": "Repaletizado / Reacondicionamiento",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Claudio Sepulveda",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-95",
    "name": "Gomez Parada Lukas Brahim",
    "rut": "19.525.853-8",
    "role": "ASISTENTE DE PICKING 2",
    "area": "Picking / Cámara Frío",
    "shiftId": "turno-2",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Francisco Lara",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-96",
    "name": "Acuña Meliman Nicolás Francisco",
    "rut": "18.247.515-7",
    "role": "ASISTENTE DE DESPACHO 1",
    "area": "Andenes de Despacho",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Nelson Brito",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-97",
    "name": "Zamorano Durán Marcelo Eduardo",
    "rut": "15.485.715-k",
    "role": "ENCAJADO",
    "area": "Encajado Frío",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-98",
    "name": "Arias Navarrete Jose Luis",
    "rut": "14.160.698-0",
    "role": "ASISTENTE DE DESPACHO 1",
    "area": "Andenes de Despacho",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Nelson Brito",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-99",
    "name": "Mariqueo Muñoz Francisco Andres",
    "rut": "20.550.357-9",
    "role": "ASISTENTE DE DESPACHO 3",
    "area": "Andenes de Despacho",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Mayckell Pereira",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-100",
    "name": "Quintana Painemal Isaias Abraham",
    "rut": "20.141.576.4",
    "role": "ASISTENTE REPALETIZADO",
    "area": "Repaletizado / Reacondicionamiento",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Cristian Hernandez",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-101",
    "name": "Maximiliano Alexander Vega Gallardo",
    "rut": "21.968.116-k",
    "role": "ASISTENTE DE DESPACHO 1",
    "area": "Andenes de Despacho",
    "shiftId": "turno-1",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Nelson Brito",
    "jefeTurno": "Ariel Mella / Turno Mañana",
    "company": "Cial Alimentos"
  },
  {
    "id": "op-102",
    "name": "Astudillo Torrejon Gustavo Adolfo",
    "rut": "19.112.914-8",
    "role": "ASISTENTE DE DESPACHO 3",
    "area": "Andenes de Despacho",
    "shiftId": "turno-3",
    "active": true,
    "createdAt": "2026-01-01T07:00:00Z",
    "supervisor": "Mayckell Pereira",
    "jefeTurno": "Euro Velasquez",
    "company": "Cial Alimentos"
  }
];

export type CompactStatusTuple = [AttendanceStatus] | [AttendanceStatus, string];

export const HISTORICAL_ATTENDANCE_COMPACT: Record<string, Record<string, CompactStatusTuple>> = {
  "op-1": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-02": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "licencia",
      "Licencia médica"
    ],
    "2026-10-07": [
      "licencia",
      "Licencia médica"
    ],
    "2026-10-08": [
      "licencia",
      "Licencia médica"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-2": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-07": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-08": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-09": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-10": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-31": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-24": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-04": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-16": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-3": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-16": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-4": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-09-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-09-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-5": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-6": {
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-7": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-28": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-8": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-28": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-9": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-10": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-11": {
    "2026-01-02": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-03": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-04": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-05": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-06": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-07": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-08": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-09": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-10": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-11": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-12": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-13": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-14": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-15": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-16": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-02": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-03": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-04": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-05": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-06": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-07": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-08": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-09": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-10": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-11": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-12": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-13": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-14": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-15": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-16": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-18": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-02": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-03": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-04": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-05": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-06": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-07": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-08": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-28": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-29": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-30": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-01": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-02": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-03": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-04": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-05": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-28": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-21": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-12": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-12": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-07": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-08": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-09": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-10": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-11": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-12": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-13": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-14": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-15": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-16": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-18": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-19": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-20": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-13": {
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-22": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-14": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-15": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-28": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-16": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-17": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-22": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-18": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-31": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-19": {
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-30": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-09": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-22": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-20": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-15": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-18": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-19": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-20": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-21": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-22": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-23": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-24": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-28": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-29": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-30": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-31": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-01": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-02": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-03": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-21": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-06-23": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-06-24": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-06-25": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-22": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-19": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-20": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-21": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-22": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-23": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-24": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-31": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-31": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-04": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-12": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-13": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-14": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-23": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-28": [
      "presente"
    ],
    "2026-06-29": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-24": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-04": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "licencia",
      "Licencia médica"
    ],
    "2026-09-11": [
      "licencia",
      "Licencia médica"
    ],
    "2026-09-14": [
      "licencia",
      "Licencia médica"
    ],
    "2026-09-15": [
      "licencia",
      "Licencia médica"
    ],
    "2026-09-16": [
      "licencia",
      "Licencia médica"
    ],
    "2026-09-21": [
      "licencia",
      "Licencia médica"
    ],
    "2026-09-22": [
      "licencia",
      "Licencia médica"
    ],
    "2026-09-23": [
      "licencia",
      "Licencia médica"
    ],
    "2026-09-24": [
      "licencia",
      "Licencia médica"
    ],
    "2026-09-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-25": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-23": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-29": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-30": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-26": {
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-31": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-27": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-28": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-28": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-29": {
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-30": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-07": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-08": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-09": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-23": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-24": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-28": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-29": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-30": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-31": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-01": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-02": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-03": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-04": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-05": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-06": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-07": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-31": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-20": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-10-08": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-10-09": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-10-12": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-10-13": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-10-14": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-10-15": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-32": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-33": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-34": {
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-35": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-03-24": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-28": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-29": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-30": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-31": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-05": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-09": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-10": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-11": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-12": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-13": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-14": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-15": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-16": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-31": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-07": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-10": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-11": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-12": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-13": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-14": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-18": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-19": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-20": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-21": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-24": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-36": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-37": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-38": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-18": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-19": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-39": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-16": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "licencia",
      "Licencia médica"
    ],
    "2026-10-20": [
      "licencia",
      "Licencia médica"
    ],
    "2026-10-21": [
      "licencia",
      "Licencia médica"
    ],
    "2026-10-22": [
      "licencia",
      "Licencia médica"
    ],
    "2026-10-23": [
      "licencia",
      "Licencia médica"
    ],
    "2026-10-26": [
      "ausente",
      "Ausencia injustificada"
    ]
  },
  "op-40": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-30": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-31": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-01": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-02": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-04": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-05": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-06": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "licencia",
      "Licencia médica"
    ],
    "2026-09-03": [
      "licencia",
      "Licencia médica"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-41": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-11": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-13": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-14": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-15": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-16": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-18": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-19": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-20": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-21": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-22": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-23": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-24": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-05-12": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-13": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-42": {
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-43": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-44": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-45": {
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-07": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ]
  },
  "op-46": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-47": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-48": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-49": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-31": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "licencia",
      "Licencia médica"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-50": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-06": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-07": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "ausente",
      "Ausencia injustificada"
    ]
  },
  "op-51": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-16": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-18": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-19": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-28": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-52": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-53": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-54": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-55": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-31": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-56": {
    "2026-01-02": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-18": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-09": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-10": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-28": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-29": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-30": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-01": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-02": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-03": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-10-20": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-21": [
      "licencia",
      "Licencia médica"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "licencia",
      "Licencia médica"
    ]
  },
  "op-57": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-28": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-58": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ]
  },
  "op-59": {
    "2026-01-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-09": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-60": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-61": {
    "2026-01-01": [
      "presente"
    ],
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-06": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-07": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-08": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-09": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-10": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-11": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-12": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-13": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-14": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-15": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-16": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-17": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-18": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-19": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-62": {
    "2026-01-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-63": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-12": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-13": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-14": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-15": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-18": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-19": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-20": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-21": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-22": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-28": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-28": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ]
  },
  "op-64": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-65": {
    "2026-01-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-02": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-04": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-05": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-06": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-07": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-10": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-11": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-66": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-02": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-03": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-04": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-05": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-08": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-09": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-15": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-16": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "licencia",
      "Licencia médica"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-67": {
    "2026-01-02": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-68": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-69": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-15": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ]
  },
  "op-70": {
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-31": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-22": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-71": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-72": {
    "2026-01-03": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-17": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-22": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ]
  },
  "op-73": {
    "2026-01-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-24": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-28": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-29": [
      "licencia",
      "Licencia médica"
    ],
    "2026-01-30": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-16": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-18": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-19": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-20": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-31": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-29": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-30": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-04": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-05": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-06": [
      "licencia",
      "Licencia médica"
    ],
    "2026-05-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-31": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-06-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-07-31": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-08-31": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-09-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-02": [
      "licencia",
      "Licencia médica"
    ],
    "2026-10-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-10-23": [
      "licencia",
      "Licencia médica extendida"
    ]
  },
  "op-74": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-75": {
    "2026-01-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-03-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-30": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-76": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-01-30": [
      "presente"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-18": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "justificada",
      "Permiso administrativo"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-77": {
    "2026-01-02": [
      "presente"
    ],
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-20": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-21": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-28": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-01-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-02": [
      "presente"
    ],
    "2026-02-03": [
      "presente"
    ],
    "2026-02-04": [
      "presente"
    ],
    "2026-02-05": [
      "presente"
    ],
    "2026-02-06": [
      "presente"
    ],
    "2026-02-09": [
      "presente"
    ],
    "2026-02-10": [
      "presente"
    ],
    "2026-02-11": [
      "presente"
    ],
    "2026-02-12": [
      "presente"
    ],
    "2026-02-13": [
      "presente"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "presente"
    ],
    "2026-02-17": [
      "presente"
    ],
    "2026-02-18": [
      "presente"
    ],
    "2026-02-19": [
      "presente"
    ],
    "2026-02-20": [
      "presente"
    ],
    "2026-02-23": [
      "presente"
    ],
    "2026-02-24": [
      "presente"
    ],
    "2026-02-25": [
      "presente"
    ],
    "2026-02-26": [
      "presente"
    ],
    "2026-02-27": [
      "presente"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-25": [
      "presente"
    ],
    "2026-03-26": [
      "presente"
    ],
    "2026-03-27": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "presente"
    ],
    "2026-04-28": [
      "presente"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "presente"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "presente"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-10": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-07-13": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-14": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-15": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-16": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-17": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-18": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-19": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-20": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-23": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-24": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-28": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-29": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-30": [
      "licencia",
      "Licencia médica"
    ],
    "2026-07-31": [
      "licencia",
      "Licencia médica"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-14": [
      "presente"
    ],
    "2026-09-15": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-17": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-09-30": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-78": {
    "2026-01-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-01-31": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-02-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-03-31": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-06": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-07": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-08": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-09": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-10": [
      "licencia",
      "Licencia médica"
    ],
    "2026-04-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-16": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-25": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-26": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-27": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-28": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-29": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-04-30": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-01": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-02": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-03": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-04": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-05": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-06": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-07": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-08": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-09": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-10": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-11": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-12": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-13": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-14": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-15": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-17": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-18": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-19": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-20": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-21": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-22": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-23": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-24": [
      "licencia",
      "Licencia médica extendida"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-12": [
      "presente"
    ],
    "2026-06-15": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-23": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-24": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-25": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-26": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-27": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-29": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-06-30": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-01": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-17": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-21": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "presente"
    ],
    "2026-09-08": [
      "presente"
    ],
    "2026-09-09": [
      "presente"
    ],
    "2026-09-10": [
      "presente"
    ],
    "2026-09-11": [
      "presente"
    ],
    "2026-09-16": [
      "presente"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-09-29": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "presente"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  },
  "op-79": {
    "2026-01-05": [
      "presente"
    ],
    "2026-01-06": [
      "presente"
    ],
    "2026-01-07": [
      "presente"
    ],
    "2026-01-08": [
      "presente"
    ],
    "2026-01-09": [
      "presente"
    ],
    "2026-01-11": [
      "presente"
    ],
    "2026-01-12": [
      "presente"
    ],
    "2026-01-13": [
      "presente"
    ],
    "2026-01-14": [
      "presente"
    ],
    "2026-01-15": [
      "presente"
    ],
    "2026-01-16": [
      "presente"
    ],
    "2026-01-19": [
      "presente"
    ],
    "2026-01-20": [
      "presente"
    ],
    "2026-01-21": [
      "presente"
    ],
    "2026-01-22": [
      "presente"
    ],
    "2026-01-23": [
      "presente"
    ],
    "2026-01-26": [
      "presente"
    ],
    "2026-01-27": [
      "presente"
    ],
    "2026-01-28": [
      "presente"
    ],
    "2026-01-29": [
      "presente"
    ],
    "2026-02-02": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-03": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-04": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-05": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-06": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-12": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-13": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-02-15": [
      "presente"
    ],
    "2026-02-16": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-17": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-18": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-19": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-20": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-02-23": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-24": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-25": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-26": [
      "licencia",
      "Licencia médica"
    ],
    "2026-02-27": [
      "licencia",
      "Licencia médica"
    ],
    "2026-03-02": [
      "presente"
    ],
    "2026-03-03": [
      "presente"
    ],
    "2026-03-04": [
      "presente"
    ],
    "2026-03-05": [
      "presente"
    ],
    "2026-03-06": [
      "presente"
    ],
    "2026-03-09": [
      "presente"
    ],
    "2026-03-10": [
      "presente"
    ],
    "2026-03-11": [
      "presente"
    ],
    "2026-03-12": [
      "presente"
    ],
    "2026-03-13": [
      "presente"
    ],
    "2026-03-16": [
      "presente"
    ],
    "2026-03-17": [
      "presente"
    ],
    "2026-03-18": [
      "presente"
    ],
    "2026-03-19": [
      "presente"
    ],
    "2026-03-20": [
      "presente"
    ],
    "2026-03-23": [
      "presente"
    ],
    "2026-03-24": [
      "presente"
    ],
    "2026-03-30": [
      "presente"
    ],
    "2026-03-31": [
      "presente"
    ],
    "2026-04-01": [
      "presente"
    ],
    "2026-04-02": [
      "presente"
    ],
    "2026-04-03": [
      "presente"
    ],
    "2026-04-06": [
      "presente"
    ],
    "2026-04-07": [
      "presente"
    ],
    "2026-04-08": [
      "presente"
    ],
    "2026-04-09": [
      "presente"
    ],
    "2026-04-10": [
      "presente"
    ],
    "2026-04-12": [
      "presente"
    ],
    "2026-04-13": [
      "presente"
    ],
    "2026-04-14": [
      "presente"
    ],
    "2026-04-15": [
      "presente"
    ],
    "2026-04-16": [
      "presente"
    ],
    "2026-04-17": [
      "presente"
    ],
    "2026-04-20": [
      "presente"
    ],
    "2026-04-21": [
      "presente"
    ],
    "2026-04-22": [
      "presente"
    ],
    "2026-04-23": [
      "presente"
    ],
    "2026-04-24": [
      "presente"
    ],
    "2026-04-25": [
      "presente"
    ],
    "2026-04-27": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-04-29": [
      "presente"
    ],
    "2026-04-30": [
      "presente"
    ],
    "2026-05-04": [
      "presente"
    ],
    "2026-05-05": [
      "presente"
    ],
    "2026-05-06": [
      "presente"
    ],
    "2026-05-07": [
      "presente"
    ],
    "2026-05-08": [
      "presente"
    ],
    "2026-05-11": [
      "presente"
    ],
    "2026-05-12": [
      "presente"
    ],
    "2026-05-13": [
      "presente"
    ],
    "2026-05-14": [
      "presente"
    ],
    "2026-05-15": [
      "presente"
    ],
    "2026-05-18": [
      "presente"
    ],
    "2026-05-19": [
      "presente"
    ],
    "2026-05-20": [
      "presente"
    ],
    "2026-05-21": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-05-22": [
      "presente"
    ],
    "2026-05-25": [
      "presente"
    ],
    "2026-05-26": [
      "presente"
    ],
    "2026-05-27": [
      "presente"
    ],
    "2026-05-28": [
      "presente"
    ],
    "2026-05-29": [
      "presente"
    ],
    "2026-05-30": [
      "presente"
    ],
    "2026-06-01": [
      "presente"
    ],
    "2026-06-02": [
      "presente"
    ],
    "2026-06-03": [
      "presente"
    ],
    "2026-06-04": [
      "presente"
    ],
    "2026-06-05": [
      "presente"
    ],
    "2026-06-08": [
      "presente"
    ],
    "2026-06-09": [
      "presente"
    ],
    "2026-06-10": [
      "presente"
    ],
    "2026-06-11": [
      "presente"
    ],
    "2026-06-16": [
      "presente"
    ],
    "2026-06-17": [
      "presente"
    ],
    "2026-06-18": [
      "presente"
    ],
    "2026-06-19": [
      "presente"
    ],
    "2026-06-22": [
      "presente"
    ],
    "2026-06-23": [
      "presente"
    ],
    "2026-06-24": [
      "presente"
    ],
    "2026-06-25": [
      "presente"
    ],
    "2026-06-26": [
      "presente"
    ],
    "2026-06-29": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-06-30": [
      "presente"
    ],
    "2026-07-01": [
      "presente"
    ],
    "2026-07-02": [
      "presente"
    ],
    "2026-07-03": [
      "presente"
    ],
    "2026-07-06": [
      "presente"
    ],
    "2026-07-07": [
      "presente"
    ],
    "2026-07-08": [
      "presente"
    ],
    "2026-07-09": [
      "presente"
    ],
    "2026-07-10": [
      "presente"
    ],
    "2026-07-13": [
      "presente"
    ],
    "2026-07-14": [
      "presente"
    ],
    "2026-07-15": [
      "presente"
    ],
    "2026-07-16": [
      "presente"
    ],
    "2026-07-20": [
      "presente"
    ],
    "2026-07-21": [
      "presente"
    ],
    "2026-07-22": [
      "presente"
    ],
    "2026-07-23": [
      "presente"
    ],
    "2026-07-24": [
      "presente"
    ],
    "2026-07-27": [
      "presente"
    ],
    "2026-07-28": [
      "presente"
    ],
    "2026-07-29": [
      "presente"
    ],
    "2026-07-30": [
      "presente"
    ],
    "2026-07-31": [
      "presente"
    ],
    "2026-08-03": [
      "presente"
    ],
    "2026-08-04": [
      "presente"
    ],
    "2026-08-05": [
      "presente"
    ],
    "2026-08-06": [
      "presente"
    ],
    "2026-08-07": [
      "presente"
    ],
    "2026-08-10": [
      "presente"
    ],
    "2026-08-11": [
      "presente"
    ],
    "2026-08-12": [
      "presente"
    ],
    "2026-08-13": [
      "presente"
    ],
    "2026-08-14": [
      "presente"
    ],
    "2026-08-17": [
      "presente"
    ],
    "2026-08-18": [
      "presente"
    ],
    "2026-08-19": [
      "presente"
    ],
    "2026-08-20": [
      "presente"
    ],
    "2026-08-24": [
      "presente"
    ],
    "2026-08-25": [
      "presente"
    ],
    "2026-08-26": [
      "presente"
    ],
    "2026-08-27": [
      "presente"
    ],
    "2026-08-28": [
      "presente"
    ],
    "2026-08-31": [
      "presente"
    ],
    "2026-09-01": [
      "presente"
    ],
    "2026-09-02": [
      "presente"
    ],
    "2026-09-03": [
      "presente"
    ],
    "2026-09-04": [
      "presente"
    ],
    "2026-09-07": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-08": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-09": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-10": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-11": [
      "vacaciones",
      "Feriado legal / Vacaciones"
    ],
    "2026-09-21": [
      "presente"
    ],
    "2026-09-22": [
      "presente"
    ],
    "2026-09-23": [
      "presente"
    ],
    "2026-09-24": [
      "presente"
    ],
    "2026-09-25": [
      "presente"
    ],
    "2026-09-28": [
      "presente"
    ],
    "2026-10-01": [
      "presente"
    ],
    "2026-10-02": [
      "presente"
    ],
    "2026-10-05": [
      "presente"
    ],
    "2026-10-06": [
      "presente"
    ],
    "2026-10-07": [
      "presente"
    ],
    "2026-10-08": [
      "presente"
    ],
    "2026-10-09": [
      "presente"
    ],
    "2026-10-12": [
      "ausente",
      "Ausencia injustificada"
    ],
    "2026-10-13": [
      "presente"
    ],
    "2026-10-14": [
      "presente"
    ],
    "2026-10-15": [
      "presente"
    ],
    "2026-10-16": [
      "presente"
    ],
    "2026-10-19": [
      "presente"
    ],
    "2026-10-20": [
      "presente"
    ],
    "2026-10-21": [
      "presente"
    ],
    "2026-10-22": [
      "presente"
    ],
    "2026-10-23": [
      "presente"
    ],
    "2026-10-26": [
      "presente"
    ]
  }
};

const SHIFT_NAMES: Record<string, ShiftType> = {
  'turno-1': 'Turno 1 (Mañana 07:00 - 15:00)',
  'turno-2': 'Turno 2 (Tarde 15:00 - 23:00)',
  'turno-3': 'Turno 3 (Noche 23:00 - 07:00)'
};

export function getHistoricalAttendanceForDate(date: string, shiftId?: string): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  
  for (const op of REAL_OPERATORS) {
    if (shiftId && shiftId !== 'todos' && op.shiftId !== shiftId) {
      continue;
    }
    
    const opHist = HISTORICAL_ATTENDANCE_COMPACT[op.id];
    if (opHist && opHist[date]) {
      const tuple = opHist[date];
      const status = tuple[0];
      const notes = tuple.length > 1 ? tuple[1] : undefined;
      const opShift = op.shiftId || 'turno-1';
      
      records.push({
        id: `att-hist-${op.id}-${date}`,
        date,
        shiftId: opShift,
        shiftName: SHIFT_NAMES[opShift] || 'Turno 1 (Mañana 07:00 - 15:00)',
        operatorId: op.id,
        operatorName: op.name,
        operatorRole: op.role,
        operatorArea: op.area,
        status,
        notes,
        registeredBy: 'Historial CIAL (01-ene a 31-oct)',
        updatedAt: `${date}T08:00:00Z`
      });
    }
  }
  
  return records;
}

export function getOperatorStats(operatorId: string, monthPrefix?: string) {
  const opHist = HISTORICAL_ATTENDANCE_COMPACT[operatorId] || {};
  let totalEvaluated = 0;
  let presentes = 0;
  let ausencias = 0;
  let vacaciones = 0;
  let licencias = 0;
  let permisos = 0;

  for (const [date, tuple] of Object.entries(opHist)) {
    if (monthPrefix && !date.startsWith(monthPrefix)) {
      continue;
    }
    const st = tuple[0];
    totalEvaluated++;
    if (st === 'presente') presentes++;
    else if (st === 'ausente') ausencias++;
    else if (st === 'vacaciones') vacaciones++;
    else if (st === 'licencia') licencias++;
    else if (st === 'justificada') permisos++;
  }

  const adherencia = totalEvaluated > 0 ? Math.round((presentes / totalEvaluated) * 100) : 0;

  return {
    totalEvaluated,
    presentes,
    ausencias,
    vacaciones,
    licencias,
    permisos,
    adherencia
  };
}

export function exportFullAttendanceMatrixCsv(): void {
  const headers = [
    'Jefe turno',
    'Supervisor',
    'Nombre',
    'Rut',
    'Cargo',
    'Empresa',
    ...HISTORICAL_HEADER_DAYS
  ];

  const statusLabelMap: Record<AttendanceStatus, string> = {
    presente: 'Presente',
    tarde: 'Llegó tarde',
    ausente: 'Ausencia',
    licencia: 'Licencia',
    justificada: 'Permiso',
    vacaciones: 'Vacaciones',
    sin_marcar: 'Sin Marcar'
  };

  const rows = REAL_OPERATORS.map(op => {
    const opHist = HISTORICAL_ATTENDANCE_COMPACT[op.id] || {};
    const dayValues = HISTORICAL_DATE_KEYS.map(dateKey => {
      const tuple = opHist[dateKey];
      if (!tuple) return '';
      const st = tuple[0];
      const nt = tuple.length > 1 ? tuple[1] : '';
      if (nt && nt.includes('extendida')) return 'Licencia Extendida';
      return statusLabelMap[st] || st;
    });

    return [
      op.jefeTurno || '',
      op.supervisor || '',
      op.name,
      op.rut || '',
      op.role,
      op.company || 'Cial Alimentos',
      ...dayValues
    ];
  });

  const csvContent = [
    headers.join(';'),
    ...rows.map(row => 
      row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(';')
    )
  ].join('\r\n');

  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `historial_asistencia_cial_2026_01ene_31oct.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
