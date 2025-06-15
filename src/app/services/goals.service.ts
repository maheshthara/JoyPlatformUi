import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HealthGoal } from '../models/HealthGoal';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {


  private apiUrl = 'https://localhost:7171/api/HealthGoal'; // Your backend URL

  constructor(private http: HttpClient) {}

  // Fetch user goals by extracting user ID from JWT token
  getUserGoals(): Observable<HealthGoal[]> {
    const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<HealthGoal[]>(`${this.apiUrl}/getGoals`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching goals:', error);
        throw error;
      })
    );
  }

  //  Add a new goal
  addGoal(goal: HealthGoal): Observable<HealthGoal> {
    const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post<HealthGoal>(`${this.apiUrl}/addGoal`, goal, { headers }).pipe(
      catchError((error) => {
        console.error('Error adding goal:', error);
        throw error;
      })
    );
  }
  editGoal(goalId: number, updatedGoal: HealthGoal): Observable<HealthGoal> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    return this.http.put<HealthGoal>(`${this.apiUrl}/updateGoal/${goalId}`, updatedGoal, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating goal:', error);
        throw error;
      })
    );
  }
  
  // Delete a goal
  deleteGoal(goalId: number): Observable<HealthGoal> {
    return this.http.delete<HealthGoal>(`${this.apiUrl}/${goalId}`);
  }
}