import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendtokenComponent } from './resendtoken.component';

describe('ResendtokenComponent', () => {
  let component: ResendtokenComponent;
  let fixture: ComponentFixture<ResendtokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendtokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendtokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
