import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsInputComponent } from './destinations-input.component';

describe('DestinationsInputComponent', () => {
  let component: DestinationsInputComponent;
  let fixture: ComponentFixture<DestinationsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestinationsInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
