import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcTrainingComponent } from './orc-training.component';

describe('OrcTrainingComponent', () => {
  let component: OrcTrainingComponent;
  let fixture: ComponentFixture<OrcTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
