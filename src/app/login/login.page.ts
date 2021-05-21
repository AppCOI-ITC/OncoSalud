import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorHandling: String = ''
  private ionicForm: FormGroup;

  errorMessages = {
    'auth/user-not-found': 'email no encontrado',
    'auth/wrong-password': 'contraseña o email invalidos'
  }

  constructor(private authSvc:AuthService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]  
    })
  }

  async submitForm() {
    if (!this.ionicForm.valid) {
      return false;
    } else {
      /*var estado =*/ 
      var estado = await this.authSvc.login(this.ionicForm.value['email'], this.ionicForm.value['password'])
      console.log(estado)
      this.errorHandling = this.errorMessages[estado]
      // console.log(this.ionicForm.value)
    }
  }
}
