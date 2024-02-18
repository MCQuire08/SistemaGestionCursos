// header.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { LoginService } from '../../../auth/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  profileImageUrl: string = '';

  constructor(private router: Router, private userService: UserService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loadProfileImage();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  user(): void {
    this.router.navigate(['/user']);
  }

  logout(): void {
    this.loginService.logout();
  }

  loadProfileImage() {
    this.userService.getProfile().subscribe(
      (profile: any) => {
        if (profile && profile.linkImage) {
          this.profileImageUrl = profile.linkImage;
        }
      },
      error => {
        console.error('Error al obtener la imagen del perfil:', error);
      }
    );
  }
}
