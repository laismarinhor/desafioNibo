import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  lista: string | null | undefined;

  constructor() { }

  ngOnInit(): void {
    this.lista = JSON.parse(localStorage.lista);
  }

}
