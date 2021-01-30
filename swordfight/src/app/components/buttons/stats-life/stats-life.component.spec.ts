import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsLifeComponent } from './stats-life.component';

describe('StatsLifeComponent', () => {
  let component: StatsLifeComponent;
  let fixture: ComponentFixture<StatsLifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsLifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
