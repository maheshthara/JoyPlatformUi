import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalEditModalComponent } from './goal-edit-modal.component';

describe('GoalEditModalComponent', () => {
  let component: GoalEditModalComponent;
  let fixture: ComponentFixture<GoalEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
