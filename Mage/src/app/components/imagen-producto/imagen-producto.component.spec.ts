import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenProductoComponent } from './imagen-producto.component';

describe('ImagenProductoComponent', () => {
  let component: ImagenProductoComponent;
  let fixture: ComponentFixture<ImagenProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
