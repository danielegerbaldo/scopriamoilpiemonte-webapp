import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MioComuneComponent } from './mio-comune.component';

describe('MioComuneComponent', () => {
  let component: MioComuneComponent;
  let fixture: ComponentFixture<MioComuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MioComuneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MioComuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
