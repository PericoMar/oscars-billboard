import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Film } from './film';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [],
  templateUrl: './film.component.html',
  styleUrl: './film.component.css'
})
export class FilmComponent {
  @Input() film! : Film;
}
