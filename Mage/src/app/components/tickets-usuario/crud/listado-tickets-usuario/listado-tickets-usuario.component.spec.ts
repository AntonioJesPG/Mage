import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTicketsUsuarioComponent } from './listado-tickets-usuario.component';

describe('ListadoTicketsUsuarioComponent', () => {
  let component: ListadoTicketsUsuarioComponent;
  let fixture: ComponentFixture<ListadoTicketsUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTicketsUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTicketsUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
