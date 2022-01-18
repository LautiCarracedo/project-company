import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Asegurado } from '../models/asegurado';
import { AseguradoService } from '../services/asegurado.service';
import { NgbActiveModal, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Eliminación exitosa</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{name}} eliminado con éxito!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Cerrar</button>
    </div>
  `
})

export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  listAsegurados: Asegurado[] = [];
  public consulta_apellido: string;
  public consulta_ramo: string;
  public consulta_inicio_poliza: Date;
  public consulta_fin_poliza: Date;
  RegistrosTotal: number;
  Pagina = 1; // inicia pagina 1
  
  mostrarFormConsultaApellido: boolean = false;
  mostrarFormConsultaRamo: boolean = false;
  mostrarFormConsultaFechas: boolean = false;

  model1: NgbDateStruct;
  model2: NgbDateStruct;

  constructor(private aseguradoService: AseguradoService, 
              private toastr: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obtenerAsegurados()
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'Asegurado';
  }

  touchButtonApellido(){
    this.mostrarFormConsultaApellido =! this.mostrarFormConsultaApellido;
  }

  touchButtonRamo(){
    this.mostrarFormConsultaRamo =! this.mostrarFormConsultaRamo;
  }

  touchButtonFechas(){
    this.mostrarFormConsultaFechas =! this.mostrarFormConsultaFechas;
  }

  obtenerAsegurados(){
    this.aseguradoService.obtenerAsegurado().subscribe(data => {
      this.listAsegurados = [];
      data.forEach((element: any) => {
        this.listAsegurados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.listAsegurados);
    })
  }

  obtenerFechasPolizas(){
    
  }

  consultarAseguradoXApellido() {

    if(this.consulta_apellido){
      this.aseguradoService.obtenerAseguradoXApellido(this.consulta_apellido).subscribe(
        (aseg: Asegurado[]) => {
          console.log(aseg);
          this.listAsegurados = aseg;
        }
      )
    }
    else{
      return;
    }
  }

  consultarAseguradoXRamo() {

    if(this.consulta_ramo){
      this.aseguradoService.obtenerAseguradoXRamo(this.consulta_ramo).subscribe(
        (aseg: Asegurado[]) => {
          console.log(aseg);
          this.listAsegurados = aseg;
        }
      )
    }
    else{
      return;
    }
  }

  consultarAseguradoXFecha() {

    if(this.consulta_inicio_poliza && this.consulta_inicio_poliza) {
      this.aseguradoService.obtenerAseguradoXFecha(this.consulta_inicio_poliza, this.consulta_fin_poliza).subscribe(
        (aseg: Asegurado[]) => {
          console.log(aseg);
          this.listAsegurados = aseg;
        }
      )
    }
    else{
      return;
    }
  }

  eliminarAsegurado(dni: string){
    this.aseguradoService.eliminarAsegurado(dni).then(() => {
      console.log("Asegurado eliminado con exito");
      const modalRef = this.modalService.open(NgbdModalContent);
      modalRef.componentInstance.name = 'Asegurado';
    }).catch(error => {
      console.log(error);
    })
  }

  
}
