import { Component } from '@angular/core';
import { CourseCardComponent } from '../../components/course-card/course-card.component';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {

}
