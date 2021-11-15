import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaLineaPedidoComponent } from './tabla-linea-pedido.component';

describe('TablaLineaPedidoComponent', () => {
  let component: TablaLineaPedidoComponent;
  let fixture: ComponentFixture<TablaLineaPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaLineaPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaLineaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
