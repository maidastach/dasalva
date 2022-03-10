import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverinstructionsComponent } from './deliverinstructions.component';

describe('DeliverinstructionsComponent', () => {
  let component: DeliverinstructionsComponent;
  let fixture: ComponentFixture<DeliverinstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverinstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverinstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
