import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenServiciosComponent } from './orden-servicios.component';

describe('OrdenServiciosComponent', () => {
  let component: OrdenServiciosComponent;
  let fixture: ComponentFixture<OrdenServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
