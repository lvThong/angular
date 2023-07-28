import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent {
  @Input() title: any;
  constructor(public  activeModal: NgbActiveModal,) {
  
  }
  ngOnInit() {

  }
  deleteItem(){
    this.activeModal.close();
  }
  cancel() {

    this.activeModal.dismiss();
  }
  
}
