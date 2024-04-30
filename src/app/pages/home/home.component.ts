import { Component } from '@angular/core';
import { FilmComponent } from '../../components/film/film.component';
import { Film } from '../../components/film/film';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FilmComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  films: Film[] = [
    {
      movieID: "1",
      titulo: "Interestelar",
      poster: "poster1.jpg",
      imagen: "imagen1.jpg",
      director: "Christopher Nolan",
      genero: "Ciencia ficción",
      duracion: 169,
      clasificacion: 10
    },
    {
      movieID: "2",
      titulo: "El Padrino",
      poster: "poster2.jpg",
      imagen: "imagen2.jpg",
      director: "Francis Ford Coppola",
      genero: "Drama",
      duracion: 175,
      clasificacion: 9
    }
  ];
}
