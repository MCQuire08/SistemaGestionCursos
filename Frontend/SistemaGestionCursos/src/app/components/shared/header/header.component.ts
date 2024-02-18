import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  constructor(private router: Router){

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  user():void{
    this.router.navigate(['/user']);
  }
  
}
