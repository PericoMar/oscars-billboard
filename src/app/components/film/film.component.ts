import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Film } from './film';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './film.component.html',
  styleUrl: './film.component.css'
})
export class FilmComponent {
  @Input() film! : Film;
}
