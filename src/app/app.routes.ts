import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WinnersPageComponent } from './pages/winners-page/winners-page.component';
import { FilmComponent } from './pages/film/film.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta vacía dirige al componente HomeComponent
  { path: 'winners-page', component: WinnersPageComponent }, // Ruta '/winners-page' dirige al componente WinnerPageComponent
  { path: 'film/:id', component: FilmComponent }, // Ruta '/film/:id' dirige al componente FilmComponent, donde ':id' es un parámetro dinámico
];
