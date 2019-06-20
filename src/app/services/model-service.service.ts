import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {

  constructor(private modalService: NgbModal) { }

  open(content){
    this.modalService.open(content);
  }

}
