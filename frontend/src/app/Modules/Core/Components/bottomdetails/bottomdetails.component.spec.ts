import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomdetailsComponent } from './bottomdetails.component';

describe('BottomdetailsComponent', () => {
  let component: BottomdetailsComponent;
  let fixture: ComponentFixture<BottomdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
