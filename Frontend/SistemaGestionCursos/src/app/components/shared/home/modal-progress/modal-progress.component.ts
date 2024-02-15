import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalCourseComponent } from '../modal-course/modal-course.component';

@Component({
  selector: 'app-modal-progress',
  standalone: true,
  imports: [CommonModule,FormsModule,ModalCourseComponent],
  templateUrl: './modal-progress.component.html',
  styleUrl: './modal-progress.component.css'
})
export class ModalProgressComponent {
  isOpen: boolean = false;
  badgeTexts: string[] = [];
  
  constructor(private modalService: ModalCourseComponent) {}

  openModal() {
    this.modalService.closeModal();
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
    this.modalService.openModal();
  }

  value: number = 0;

  subtract(): void {
    if (this.value > 0) {
      this.value -= 5;
    }
  }

  add(): void {
    if (this.value < 100) {
      this.value += 5;
    }
  }
}