import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsUsuarioComponent } from './tickets-usuario.component';

describe('TicketsUsuarioComponent', () => {
  let component: TicketsUsuarioComponent;
  let fixture: ComponentFixture<TicketsUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
