import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Asegurado } from '../models/asegurado';
import { AseguradoService } from '../services/asegurado.service';

@Component({
  selector: 'app-asegurados',
  templateUrl: './asegurados.component.html',
  styleUrls: ['./asegurados.component.css']
})
export class AseguradosComponent implements OnInit {
  // opciones del combo compania
  opcionesComp = [
    { compania: 'RIO URUGUAY' },
    { compania: 'CARUSO SEGUROS' },
    { compania: 'SANCOR SEGUROS' },
    { compania: 'LA NUEVA SEGUROS' },
  ];

  opcionesRama = [
    { rama: 'AUTO (PATRIMONIAL)' },
    { rama: 'MOTO (PATRIMONIAL)' },
    { rama: 'HOGAR (PATRIMONIAL' },
    { rama: 'ACCIDENTES PERSONALES' },
    { rama: 'RETIRO' },
    { rama: 'VIDA' },
    { rama: 'LEY DE CONTRATO DE TRABAJO' },
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder, 
              private aseguradoService: AseguradoService,
              private toastr: ToastrService ) {
    this.form = this.fb.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      compania: ['', Validators.required],
      ramo: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  crearAsegurado(){
    const asegurado: Asegurado = {
      apellido: this.form.value.apellido,
      nombre: this.form.value.nombre,
      dni: this.form.value.dni,
      compania: this.form.value.compania,
      ramo: this.form.value.ramo,
    }

    console.log(asegurado);
    this.aseguradoService.guardarAsegurado(asegurado).then(() => {
      console.log('Asegurado registrado');
      this.toastr.success('El asegurado se registró exitosamente!', 'Usuario registrado')
      this.form.reset();
    }, error => {
      console.log(error);
      alert(error);
    }

    )
  } 

}
