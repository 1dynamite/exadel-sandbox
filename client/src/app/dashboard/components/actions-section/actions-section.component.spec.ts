import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsSectionComponent } from './actions-section.component';

describe('ActionsSectionComponent', () => {
  let component: ActionsSectionComponent;
  let fixture: ComponentFixture<ActionsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
