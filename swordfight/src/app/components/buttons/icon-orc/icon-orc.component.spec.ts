import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconOrcComponent } from './icon-orc.component';

describe('IconOrcComponent', () => {
  let component: IconOrcComponent;
  let fixture: ComponentFixture<IconOrcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconOrcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconOrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
