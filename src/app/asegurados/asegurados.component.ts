import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Asegurado } from '../models/asegurado';
import { AseguradoService } from '../services/asegurado.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Registro exitoso</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{name}} registrado con éxito!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})

export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-asegurados',
  templateUrl: './asegurados.component.html',
  styleUrls: ['./asegurados.component.css']
})

export class AseguradosComponent implements OnInit {
  @Input() name;
  model1: NgbDateStruct;
  model2: NgbDateStruct;

  // opciones del combo compania
  opcionesComp = [
    { compania: 'RIO URUGUAY' },
    { compania: 'CARUSO SEGUROS' },
    { compania: 'SANCOR SEGUROS' },
    { compania: 'LA NUEVA SEGUROS' },
    { compania: 'TRIUNFO SEGUROS' },
    { compania: 'EXPERTA SEGUROS' },
    { compania: 'SAN CRISTOBAL SEGUROS' },
    { compania: 'ORÍGENES' },
    { compania: 'ASOCIART ART' },
    { compania: 'PROVINCIA ART' },
    { compania: 'PREVENCIÓN ART' },
  ];

  opcionesRama = [
    { rama: 'AUTO' },
    { rama: 'MOTO' },
    { rama: 'HOGAR' },
    { rama: 'ACCIDENTES PERSONALES' },
    { rama: 'RETIRO' },
    { rama: 'VIDA' },
    { rama: 'LEY DE CONTRATO DE TRABAJO' },
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder, 
              private aseguradoService: AseguradoService,
              private modalService: NgbModal ) {
    this.form = this.fb.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      compania: ['', Validators.required],
      ramo: ['', Validators.required],
      inicio_poliza: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      fin_poliza: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]]

    })
   }

  get fechaInicioNoValida(){
    return this.form.get('inicio_poliza').invalid && this.form.get('inicio_poliza').touched;
  }

  get fechaFinNoValida(){
    return this.form.get('fin_poliza').invalid && this.form.get('fin_poliza').touched;
  }



  ngOnInit(): void {
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'Asegurado';
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
      this.form.reset();
    }, error => {
      console.log(error);
      alert(error);
    }

    )
  } 

}
