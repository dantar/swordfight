import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyOrcComponent } from './enemy-orc.component';

describe('EnemyOrcComponent', () => {
  let component: EnemyOrcComponent;
  let fixture: ComponentFixture<EnemyOrcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnemyOrcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnemyOrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
