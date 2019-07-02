import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'
import { trigger, state, style, transition, animate } from '@angular/animations';

import { todoService } from '../services/todo-service.service';


@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css'],
  animations: [
    trigger('popupAnimate',[
      state('in',
        style({
          'opacity':1,
          transform: 'scale(1)'
        })
      ),
      transition('void => *',[
        style({
          'opacity':0,
          transform: 'scale(0.5)'
        }),
        animate('0.2s')
      ])
    ])
  ]
})
export class ModalContentComponent implements OnInit {

  @Input() private todoTask;

  constructor(private todoService: todoService, private modal: NgbActiveModal, private route: Router) { }

  ngOnInit() {
    if(!this.todoTask){
      this.todoTask = {}
    } 
  }

  saveTodo(value){
    value.userID = window.sessionStorage.getItem('userID');
    value.doneBy = window.sessionStorage.getItem('userName');
    this.todoService.newTodo(value).subscribe((response)=>{
      this.route.navigate(['/dailyTask']);      
      this.modal.close();
    })
  }

  updateTodo(value){
    this.todoService.updateTodo(value).subscribe((response)=>{
      this.route.navigate(['/dailyTask']);
      this.modal.close();
    })
  }

}
