import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaServiciosComponent } from './bandeja-servicios.component';

describe('BandejaServiciosComponent', () => {
  let component: BandejaServiciosComponent;
  let fixture: ComponentFixture<BandejaServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandejaServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
