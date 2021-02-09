import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEventiComponent } from './vista-eventi.component';

describe('VistaEventiComponent', () => {
  let component: VistaEventiComponent;
  let fixture: ComponentFixture<VistaEventiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaEventiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaEventiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
