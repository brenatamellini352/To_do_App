import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api'; // Verifique se o caminho está correto

@Component({
  selector: 'app-registo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registo.html',
  styleUrl: './registo.css'
})
export class Registo {
  registoData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  // Precisamos do constructor para usar o serviço e o roteador
  constructor(private api: ApiService, private router: Router) {}

  onRegisto() {
    console.log('Dados enviados para o registo:', this.registoData);
    
    // 1. Validação de senha
    if (this.registoData.password !== this.registoData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    // 2. CHAMADA AO SERVIÇO (O que estava faltando!)
    const result = this.api.register(
      this.registoData.name,
      this.registoData.email,
      this.registoData.password
    );

    // 3. Resposta ao usuário
    if (result.ok) {
      alert('Utilizador criado com sucesso!');
      this.router.navigate(['/login']); // Vai para a tela de login
    } else {
      alert(result.message); // Ex: "Email já registado"
    }
  }
}