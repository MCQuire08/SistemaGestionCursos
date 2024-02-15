import { Component } from '@angular/core';
import { ModalCourseComponent } from './modal-course/modal-course.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalCourseComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
