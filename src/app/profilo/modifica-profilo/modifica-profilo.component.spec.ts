import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaProfiloComponent } from './modifica-profilo.component';

describe('ModificaProfiloComponent', () => {
  let component: ModificaProfiloComponent;
  let fixture: ComponentFixture<ModificaProfiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaProfiloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaProfiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
