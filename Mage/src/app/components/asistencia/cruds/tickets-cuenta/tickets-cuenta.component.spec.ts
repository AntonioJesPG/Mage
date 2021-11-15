import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsCuentaComponent } from './tickets-cuenta.component';

describe('TicketsCuentaComponent', () => {
  let component: TicketsCuentaComponent;
  let fixture: ComponentFixture<TicketsCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
