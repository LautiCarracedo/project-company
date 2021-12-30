import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Asegurado } from '../models/asegurado';
import { AseguradoService } from '../services/asegurado.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  listAsegurados: Asegurado[] = [];
  consulta_apellido: string;

  constructor(private aseguradoService: AseguradoService, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerAsegurado()
  }

  obtenerAsegurado(){
    this.aseguradoService.obtenerAsegurado().subscribe(doc => {
      this.listAsegurados = [];
      doc.forEach((element: any) => {
        this.listAsegurados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.listAsegurados);
    })
  }

  consultarAsegurado(apellido: any) {
    this.aseguradoService.obtenerAseguradoFiltro(apellido).subscribe(doc => {
      this.listAsegurados = [];
      doc.forEach((element: any) => {
        this.listAsegurados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.listAsegurados);
    })
  }

}
