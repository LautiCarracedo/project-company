import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Asegurado } from '../models/asegurado';
import { Observable, ObservableInput, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AseguradoService {



  constructor(private readonly firebase: AngularFirestore) {

   }
  
  guardarAsegurado(asegurado: Asegurado): Promise<any> {
    return this.firebase.collection('asegurados').add(asegurado);
  }

  obtenerAsegurado(): Observable<any> {
    return this.firebase.collection('asegurados', ref => ref.orderBy('apellido','asc')).snapshotChanges();
  }

  //obtenerAsegurado(){
  //  return this.firebase.collection('asegurados').valueChanges();
  //}

  obtenerAseguradoXApellido(apellido: string) {
    return this.firebase.collection('asegurados', ref => ref.where('apellido','==', apellido)).valueChanges();
  }

  obtenerAseguradoXRamo(ramo: string) {
    return this.firebase.collection('asegurados', ref => ref.where('ramo','==', ramo)).valueChanges();
  }

  obtenerAseguradoXFecha(fecha_inicio: Date, fecha_fin: Date) {
    return this.firebase.collection('asegurados', ref => ref.where('fin_poliza','>=', fecha_inicio).where('fin_poliza','<=',fecha_fin)).valueChanges();
  }

  eliminarAsegurado(dni: string): Promise<any> {
    return this.firebase.collection('asegurados').doc(dni).delete();
  }

}
