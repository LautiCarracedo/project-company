import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Asegurado } from '../models/asegurado';
import { Observable, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AseguradoService {
  lista: any[] = []

  constructor(private firebase: AngularFirestore) { }
  
  guardarAsegurado(asegurado: Asegurado): Promise<any> {
    return this.firebase.collection('asegurados').add(asegurado);
  }

  obtenerAsegurado(): Observable<any>  {
    return this.firebase.collection('asegurados')[0].snapshotChanges();
  }
}
