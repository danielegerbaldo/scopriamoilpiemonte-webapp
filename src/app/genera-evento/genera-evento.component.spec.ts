import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraEventoComponent } from './genera-evento.component';

describe('GeneraEventoComponent', () => {
  let component: GeneraEventoComponent;
  let fixture: ComponentFixture<GeneraEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneraEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneraEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
