import { Component } from '@angular/core';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CustomDatePipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public fecha = new Date();

}
