import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmBookingsComponent } from './film-bookings.component';

describe('FilmBookingsComponent', () => {
  let component: FilmBookingsComponent;
  let fixture: ComponentFixture<FilmBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
