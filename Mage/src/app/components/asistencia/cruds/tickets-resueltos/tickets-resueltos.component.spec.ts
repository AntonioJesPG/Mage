import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsResueltosComponent } from './tickets-resueltos.component';

describe('TicketsResueltosComponent', () => {
  let component: TicketsResueltosComponent;
  let fixture: ComponentFixture<TicketsResueltosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsResueltosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsResueltosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
