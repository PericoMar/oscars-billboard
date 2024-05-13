import { Component, OnInit } from '@angular/core';
import { FilmComponent } from '../../components/film/film.component';
import { Film } from '../../components/film/film';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FilmComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  films: Film[] = [];

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.getFilms();
  }

  getFilms(): void {
    this.filmService.getAllFilms().subscribe(films => {
      this.films = films;
      console.log(films);
    });
  }
}