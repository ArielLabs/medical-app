import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningHistoryComponent } from './running-history.component';

describe('RunningHistoryComponent', () => {
  let component: RunningHistoryComponent;
  let fixture: ComponentFixture<RunningHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunningHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
