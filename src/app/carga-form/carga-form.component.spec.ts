import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaFormComponent } from './carga-form.component';

describe('CargaFormComponent', () => {
  let component: CargaFormComponent;
  let fixture: ComponentFixture<CargaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
