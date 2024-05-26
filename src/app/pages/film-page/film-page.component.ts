import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilmService } from '../../services/film.service';
import { Film } from '../../components/film/film';
import { FilmBookingsComponent } from '../../components/film-bookings/film-bookings.component';
import { SesionService } from '../../services/sesion.service';


@Component({
  selector: 'app-film-page',
  standalone: true,
  imports: [CommonModule, FilmBookingsComponent],
  templateUrl: './film-page.component.html',
  styleUrl: './film-page.component.css'
})
export class FilmPageComponent implements OnInit{
  film!: Film;
  isLoading : boolean = true;
  sesions! : Array<any>;
  sesionSelected! : any;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private sesionService: SesionService
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

    this.sesionService.getSesions(id).subscribe(
      sesions => {
        this.sesions = sesions;
        this.sesionSelected = sesions[0];
        console.log(this.sesions);
      },
      error => console.error(error)
    )
  }

  changeSesion(sesion : any){
    this.sesionSelected = sesion;
  }
}
