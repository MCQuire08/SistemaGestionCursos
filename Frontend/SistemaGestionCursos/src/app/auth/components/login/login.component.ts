import { Component } from '@angular/core';
import {LoginService} from '../../service/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: LoginService, private router:Router){}

  login(): void{
    if(this.authService.login(this.username,this.password)){
      Swal.fire({
        title: "Inicio de sesión correcto",
        text: "Bienvenido",
        icon: "success"
      });
      setTimeout(() => {
        this.router.navigate(['/home']);
      });
    }else{
      Swal.fire({
        title: "Inicio de sesión inválido",
        text: "Contraseña incorrecta",
        icon: "error"
      });
    }
  }
}
