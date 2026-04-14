import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router'; 
import { ApiService } from '../../services/api'; 

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData = {
    email: '',
    password: ''
  };


  constructor(private api: ApiService, private router: Router) {}

  onLogin() {
    console.log('Botão de login clicado!', this.loginData);

  
    const result = this.api.login(this.loginData.email, this.loginData.password);

    if (result.ok) {
      console.log('Login bem-sucedido!');
      
     
      this.router.navigate(['/home']); 
    } else {
     
      alert(result.message || 'Erro ao fazer login. Verifique seus dados.');
    }
  }
}