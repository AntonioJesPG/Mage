import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsPagosComponent } from './tickets-pagos.component';

describe('TicketsPagosComponent', () => {
  let component: TicketsPagosComponent;
  let fixture: ComponentFixture<TicketsPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
