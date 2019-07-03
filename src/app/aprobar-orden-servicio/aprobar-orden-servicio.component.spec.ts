import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarOrdenServicioComponent } from './aprobar-orden-servicio.component';

describe('AprobarOrdenServicioComponent', () => {
  let component: AprobarOrdenServicioComponent;
  let fixture: ComponentFixture<AprobarOrdenServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarOrdenServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarOrdenServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
