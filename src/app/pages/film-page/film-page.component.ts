import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilmService } from '../../services/film.service';
import { Film } from '../../components/film/film';


@Component({
  selector: 'app-film-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-page.component.html',
  styleUrl: './film-page.component.css'
})
export class FilmPageComponent implements OnInit{
  film!: Film;
  isLoading : boolean = true;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
  ) { }

  ngOnInit(): void {
    // Obtener el id_pelicula de la URL y convertirlo a número
    const id = this.route.snapshot.paramMap.get('id_pelicula');
    // Usar el id_pelicula para obtener los datos de la película
    this.filmService.getFilm(id).subscribe(
      film => {
        this.film = film[0];
        this.isLoading = false;
      },
      error => console.error(error)
    );
  }
}
