import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightDebriefComponent } from './fight-debrief.component';

describe('FightDebriefComponent', () => {
  let component: FightDebriefComponent;
  let fixture: ComponentFixture<FightDebriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FightDebriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightDebriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
