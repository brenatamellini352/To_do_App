import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Objeto para armazenar os dados do formulário
  loginData = {
    email: '',
    password: ''
  };
  onLogin() {
    console.log('Botão de login clicado!', this.loginData);
    // Aqui vai a lógica que estava do auth.js
  }
}
