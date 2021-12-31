import { Component, OnInit } from '@angular/core';
import { validateEventsArray } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Asegurado } from '../models/asegurado';
import { AseguradoService } from '../services/asegurado.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asegurados',
  templateUrl: './asegurados.component.html',
  styleUrls: ['./asegurados.component.css']
})
export class AseguradosComponent implements OnInit {
  model1: NgbDateStruct;
  model2: NgbDateStruct;

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
      ramo: ['', Validators.required],
      inicio_poliza: ['', Validators.required],
      fin_poliza: ['',Validators.required]

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
      inicio_poliza: this.form.value.inicio_poliza,
      fin_poliza: this.form.value.fin_poliza
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
