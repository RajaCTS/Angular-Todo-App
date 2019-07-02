import { Component, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Router, NavigationEnd } from '@angular/router'

import { ThemeChangerService } from '../services/theme-changer.service';
import { todoService } from '../services/todo-service.service'
import { ModalContentComponent } from '../modal-content/modal-content.component'

@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.css'],
  animations: [
    trigger('dailyTaskAnimate', [
      state('in',
        style({
          'opacity': 1,
          transform: 'scale(1)'
        })
      ),
      transition('void => *', [
        style({
          'opacity': 0,
          transform: 'scale(0.5)'
        }),
        animate('0.2s')
      ]),
      transition('* => void', [
        style({
          'opacity': 0,
          transform: 'scale(0.5)'
        }),
        animate('0.2s')
      ])
    ])
  ]
})
export class DailyTaskComponent {
  @ViewChild('content') modalContent: ElementRef
  appTheme;
  tasklist: any;
  navigationSub;
  loggedInUser: string;
  constructor(private themeChangerService: ThemeChangerService, private modal: NgbModal, private todoService: todoService, private route: Router) {
    this.themeChangerService.themeinfo.subscribe((data) => {
      this.appTheme = data;
    })
    this.navigationSub = this.route.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getTodos();
      }
    })

  }

  getTodos() {
    this.todoService.getTodos(window.sessionStorage).subscribe((data) => {
      this.tasklist = data['result']
    })
    this.loggedInUser = window.sessionStorage.getItem('userID');
  }

  createNewTodo() {
    this.modal.open(ModalContentComponent);    
  }

  editDailyTask(task) {
    const popupref = this.modal.open(ModalContentComponent);
    var todoTask = JSON.parse(JSON.stringify(task))
    popupref.componentInstance.todoTask = todoTask;
  }

  deleteTask(task) {
    for (var x in this.tasklist) {
      if (this.tasklist[x]['taskID'] == task.taskID) {
        this.tasklist.splice(x, 1);
      }
    }
    this.todoService.deleteTodo(task).subscribe((data)=>{
      console.log(data);
    })
  }

}
