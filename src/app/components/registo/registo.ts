import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registo',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './registo.html',
  styleUrl: './registo.css',
})
export class Registo {
  // Objeto para armazenar os dados do formulário
  registoData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  onRegisto() {
    console.log('Dados enviados para o registo:', this.registoData);
    
    // validação simples so para testar
    if (this.registoData.password !== this.registoData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
  }
}
