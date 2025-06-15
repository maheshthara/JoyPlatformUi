import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HealthGoal } from '../../models/HealthGoal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-goal-edit-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './goal-edit-modal.component.html',
  styleUrl: './goal-edit-modal.component.css'
})
export class GoalEditModalComponent {
  @Input() showModal: boolean = false;   // Whether the modal is visible
  @Input() set editingGoal(value: HealthGoal | null) {
    // Ensure editingGoal is never null by setting an empty object if it is null
    this._editingGoal = value || { goalId:0, description: '', goalTitle: '' }; // Default empty values
  }
  get editingGoal(): HealthGoal {
    return this._editingGoal;
  }
  
  private _editingGoal: HealthGoal = { goalTitle: '', description: '', goalId: 0 }; // Default empty goal
  @Output() close = new EventEmitter<void>();  // Event to close the modal
  @Output() save = new EventEmitter<HealthGoal>();  // Event to save the edited goal

  closeModal() {
    this.close.emit();  // Close the modal
  }

  saveGoal() {
    if (this.editingGoal) {
      this.save.emit(this.editingGoal);  // Emit the edited goal
    }
  }
}
