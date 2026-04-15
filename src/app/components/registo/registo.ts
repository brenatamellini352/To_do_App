import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-registo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registo.html',
  styleUrl: './registo.css'
})
export class Registo implements OnInit {
  registoData = { name: '', email: '', password: '', confirmPassword: '' };
  errorMensage = '';
  sucessMessage = '';

  constructor(
    private api: ApiService,
    private router: Router,
    public theme: Theme) { }

  ngOnInit(): void {
    this.theme.init();
  }

  onRegisto() {
    this.errorMensage = '';
    this.sucessMessage = '';

    if (!this.registoData.name || !this.registoData.email || !this.registoData.password || !this.registoData.confirmPassword) {
      this.errorMensage = 'Por favor, preencha todos os campos.';
      return;
    }
    
    if (this.registoData.password.length < 6) {
      this.errorMensage = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    if (this.registoData.password !== this.registoData.confirmPassword) {
      this.errorMensage = 'As senhas não coincidem.';
      return;
    }

    const result = this.api.register(
      this.registoData.name,
      this.registoData.email,
      this.registoData.password
    );

    if (result.ok) {
      this.sucessMessage = `Registo criado com sucesso! Bem-vindo, ${this.registoData.name}! A redirecionar para login...`;
      setTimeout(() => { this.router.navigate(['/login']); }, 1800);
    } else {
      this.errorMensage = result.message || 'Erro ao criar registo. Verifique seus dados e tente novamente.';
      // alert(result.message); // Ex: "Email já registado"
    }
  }
}