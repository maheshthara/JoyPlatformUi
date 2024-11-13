import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoalsService } from '../../services/goals.service';
import { HealthGoal, User } from '../../models/HealthGoal';
import { AuthService } from '../../services/auth.service';
import { UserRegistration } from '../../models/UserRegistration';
import { GoalEditModalComponent } from '../goal-edit-modal/goal-edit-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,GoalEditModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userGoals: HealthGoal[]=[];
  newGoal: HealthGoal = {
    goalId: 0,
    goalTitle: '',
    description: '',
  };
  user:any;
  editingGoal: HealthGoal | null = null;
  showEditModal: boolean = false;


  constructor(private goalService: GoalsService,private authService:AuthService,private toastr:ToastrService) {}

  ngOnInit(){
    this.loadUserGoals();
    this.getUserDetails();
  }

  // Fetch user goals
  loadUserGoals() {
    this.goalService.getUserGoals().subscribe(
      (goals) => {
        this.userGoals = goals;
      },
      (error) => {
        console.error('Error fetching goals:', error);
      }
    );
  }
  getUserDetails(){
    this.authService.getUserDetails().subscribe(
      (userDetails)=>{
        this.user = userDetails;

      },
      (error)=>{
        console.error('Error Retreving user Data');
      }
    )
  }

  // Add a new goal
  addGoal(){
    if (!this.newGoal.goalTitle || !this.newGoal.description) {
      alert('Please fill in all fields');
      return;
    }

    this.goalService.addGoal(this.newGoal).subscribe(
      (goal) => {
        this.userGoals.push(goal); // Add the new goal to the list
        this.newGoal.goalId=0;
        this.newGoal.goalTitle = ''; // Clear the form
        this.newGoal.description = '';
        console.log('New goal added:', goal);
      },
      (error) => {
        console.error('Error adding goal:', error);
      }
    );
  }
  openEditModal(goal: HealthGoal): void {
    // Open the edit modal and set the goal to be edited
    this.editingGoal = { ...goal }; // Copy the goal to prevent mutating the original data
    this.showEditModal = true;
  }

  closeEditModal(): void {
    // Close the edit modal
    this.showEditModal = false;
    this.editingGoal = null;
  }

  updateGoal(updatedGoal: HealthGoal): void {
    // Send the updated goal to the backend
    this.goalService.editGoal(updatedGoal.goalId, updatedGoal).subscribe(
      (goal) => {
        // Update the goal in the list
        const index = this.userGoals.findIndex(g => g.goalId === goal.goalId);
        if (index !== -1) {
          this.userGoals[index] = goal;
        }
        this.closeEditModal(); // Close the modal after successful update
        this.toastr.success('Goal Succesfully Updated');
      },
      (error) => {
        console.error('Error updating goal:', error);
      }
    );
  }
  deleteGoal(goalId: number) {
    // Call the service to delete the goal
    this.goalService.deleteGoal(goalId).subscribe(() => {
      // Remove the deleted goal from the list
      this.userGoals = this.userGoals.filter(goal => goal.goalId !== goalId);
      this.toastr.success(`Goa Id ${goalId}`, 'Goal Deleted');
    }, error => {
      console.error('Error deleting goal:', error);
    });
  }
}