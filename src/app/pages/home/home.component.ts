import { Component, OnInit } from '@angular/core';
import { FilmComponent } from '../../components/film/film.component';
import { Film } from '../../components/film/film';
import { FilmService } from '../../services/film.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FilmComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  films: Film[] = [];
  isLoading: boolean = true;

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.getFilms();
  }

  getFilms(): void {
    this.filmService.getAllFilms().subscribe(films => {
      this.films = films;
      this.isLoading = false;
      console.log(films);
    });
  }
}