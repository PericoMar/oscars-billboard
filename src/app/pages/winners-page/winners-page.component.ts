import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-winners-page',
  standalone: true,
  imports: [MatTooltipModule, RouterModule],
  templateUrl: './winners-page.component.html',
  styleUrl: './winners-page.component.css'
})
export class WinnersPageComponent {
    oscars : any = {
      'Oppenheimer': [
          'Mejor Actor Principal (Cillian Murphy)',
          'Mejor Actor de Reparto (Robert Downey Jr.)',
          'Mejor Director (Christopher Nolan)',
          'Mejor Película',
          'Mejor Diseño de Producción',
          'Mejor Edición de Sonido',
          'Mejor Banda Sonora Original'
      ],
      'Anatomía de una caída': [
          'Premio Oscar 2024 a Mejor Director',
          'Premio Oscar 2024 a Mejor Actriz Protagonista'
      ],
      'Pobres criaturas': [
          'Premio Oscar 2024 a Mejor Actriz de Reparto',
          'Premio Oscar 2024 a Mejor Diseño de Vestuario',
          'Premio Oscar 2024 a Mejor Maquillaje y Peinado',
          'Premio Oscar 2024 a Mejor Edición'
      ]
  }
  
}
