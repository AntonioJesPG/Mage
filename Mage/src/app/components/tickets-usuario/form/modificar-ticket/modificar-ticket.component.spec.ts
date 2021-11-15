import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTicketComponent } from './modificar-ticket.component';

describe('ModificarTicketComponent', () => {
  let component: ModificarTicketComponent;
  let fixture: ComponentFixture<ModificarTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
