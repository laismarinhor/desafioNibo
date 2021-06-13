import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  partidaForm = new FormGroup({
    placar1: new FormControl(),
    placar2: new FormControl()
  }); 

  lista = [];
  step = 0;
  time1 = "";
  time2 = "";

  fase = 0;
  campeao = "";

  fase0 : string[] = [];
  fase1 : string[] = [];

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    if (localStorage.lista) this.lista = JSON.parse(localStorage.lista)
    if (localStorage.fase0){
      this.fase0 = JSON.parse(localStorage.fase0);
      if (this.fase0.length  === 4) this.fase = 1;
    }
    if (localStorage.fase1) this.fase1 = JSON.parse(localStorage.fase1);
    if (localStorage.campeao) {
      this.campeao = JSON.parse(localStorage.campeao);
      this.fase = 2
    }

  }

  game(content: any){
    this.modalService.open(content);
    this.partidaForm.reset();
  }

  select(time: string){
    if (this.step ===0){
      this.time1 = time;
    } else{
      this.time2 = time;
    }
    this.step++;
  }

  encerrarJogo(erro: any){
    var form = this.partidaForm.value;

    if (form.placar1 === form.placar2){
      this.modalService.dismissAll();
      this.modalService.open(erro);
    } else{
      var campeao = form.placar1 > form.placar2 ? this.time1 : this.time2;

      this.fase0.push(this.time1);
      this.fase0.push(this.time2);
      this.fase1.push(campeao);

      this.step = 0;
      this.partidaForm.value.placar1 = "";
      this.partidaForm.value.placar2 = "";

      this.modalService.dismissAll();
      localStorage.setItem('fase0', JSON.stringify(this.fase0));
      localStorage.setItem('fase1', JSON.stringify(this.fase1));

      if (this.fase1.length === 2) this.fase = 1
    }
  }

  final(content: any){
    this.partidaForm.reset();
    this.modalService.open(content);
  }

  encerrarCampeonato(erro: any){
    var form = this.partidaForm.value;

    if (form.placar1 === form.placar2){
      this.modalService.dismissAll();
      this.modalService.open(erro);
    } else{
      this.campeao = form.placar1 > form.placar2 ? this.fase1[0] : this.fase1[1];

      this.modalService.dismissAll();
      localStorage.setItem('campeao', JSON.stringify(this.campeao));

      this.fase = 2;
    }
  }

  new(){
    localStorage.removeItem('fase0');
    localStorage.removeItem('fase1');
    localStorage.removeItem('campeao');
    location.reload();
  }

  fechar(content: any){
    this.modalService.dismissAll();
    this.modalService.open(content);
  }
}
