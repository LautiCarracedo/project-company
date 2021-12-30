import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Asegurado } from '../models/asegurado';
import { Observable, ObservableInput, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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

  obtenerAseguradoFiltro(apellido: string): Observable<any> {
    return this.firebase.collection('asegurado').doc(apellido).snapshotChanges();
  }

}
