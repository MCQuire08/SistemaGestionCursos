import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalProgressComponent } from '../modal-progress/modal-progress.component';

@Component({
  selector: 'app-modal-course',
  standalone: true,
  imports: [CommonModule,ModalProgressComponent],
  templateUrl: './modal-course.component.html',
  styleUrl: './modal-course.component.css'
})
export class ModalCourseComponent {
  isOpen: boolean = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
  
}
