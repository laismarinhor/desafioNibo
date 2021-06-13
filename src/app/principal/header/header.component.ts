import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  timeForm = new FormGroup({
    name: new FormControl(),
    coach: new FormControl()
  }); 
  closeResult = '';

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  open(content: any) {
      this.modalService.open(content);
  }

  onSubmit(): void {
    var form = this.timeForm.value;
    var temp = localStorage.lista
    var key = [];
    var lista = [];

    if(temp){
      lista = JSON.parse(temp);
    }

    for (var item in form) {
      if (form.hasOwnProperty(item)) {
        key.push(form[item]);
      }
    }

    lista.push(key);
    
    localStorage.setItem('lista', JSON.stringify(lista));

    this.modalService.dismissAll();

    location.reload();
  }

}
