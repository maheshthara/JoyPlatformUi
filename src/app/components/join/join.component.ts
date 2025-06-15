import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [],
  templateUrl: './join.component.html',
  styleUrl: './join.component.css'
})
export class JoinComponent {
  constructor(private router:Router){}
join(){
  this.router.navigate(['/signup'])

}
}
