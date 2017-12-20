import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFacturaComponent } from './view-factura.component';

describe('ViewFacturaComponent', () => {
  let component: ViewFacturaComponent;
  let fixture: ComponentFixture<ViewFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
