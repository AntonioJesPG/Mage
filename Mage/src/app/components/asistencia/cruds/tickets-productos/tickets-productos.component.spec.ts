import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsProductosComponent } from './tickets-productos.component';

describe('TicketsProductosComponent', () => {
  let component: TicketsProductosComponent;
  let fixture: ComponentFixture<TicketsProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
