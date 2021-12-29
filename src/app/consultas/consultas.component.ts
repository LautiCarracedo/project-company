import { Component, OnInit } from '@angular/core';
import { AseguradoService } from '../services/asegurado.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  asegurado: any[] = []

  constructor(private aseguradoService: AseguradoService) { }

  ngOnInit(): void {
    this.obtenerAsegurado()
  }

  obtenerAsegurado(){
    this.aseguradoService.obtenerAsegurado().subscribe(data => {
      data.forEach((element:any) => {
        console.log(element.payload.doc.id);
      });
    });
  }

}
