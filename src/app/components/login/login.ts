import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  loginData = { email: '', password: '' };
  errorMensage = '';
  sucessMessage = '';

  constructor(
    private api: ApiService,
    private router: Router,
    public theme: Theme) { }

    ngOnInit(): void {
    this.theme.init();
  }

  onLogin() {
    this.errorMensage = '';
    this.sucessMessage = '';
    
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMensage = 'Por favor, preencha todos os campos.';
      return;
    }

    const result = this.api.login(this.loginData.email, this.loginData.password);

    if (result.ok) {
      const name = result.user?.name || 'Utilizador';
      this.sucessMessage = `Bem-vindo de volta, ${name}!`;
      setTimeout(() => { this.router.navigate(['/home']); }, 1500);
    } else {

      this.errorMensage = result.message || 'Erro ao fazer login. Verifique seus dados e tente novamente.';
    }
  }
}