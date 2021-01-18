import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoEventoComponent } from './nuovo-evento.component';

describe('NuovoEventoComponent', () => {
  let component: NuovoEventoComponent;
  let fixture: ComponentFixture<NuovoEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuovoEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
