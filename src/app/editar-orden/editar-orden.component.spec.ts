import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOrdenComponent } from './editar-orden.component';

describe('EditarOrdenComponent', () => {
  let component: EditarOrdenComponent;
  let fixture: ComponentFixture<EditarOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
