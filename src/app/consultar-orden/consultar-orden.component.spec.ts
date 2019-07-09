import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarOrdenComponent } from './consultar-orden.component';

describe('ConsultarOrdenComponent', () => {
  let component: ConsultarOrdenComponent;
  let fixture: ComponentFixture<ConsultarOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
