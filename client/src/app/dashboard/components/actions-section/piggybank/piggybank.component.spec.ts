import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiggybankComponent } from './piggybank.component';

describe('PiggybankComponent', () => {
  let component: PiggybankComponent;
  let fixture: ComponentFixture<PiggybankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiggybankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiggybankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
