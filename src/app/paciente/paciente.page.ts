import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { promise } from 'selenium-webdriver';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {

  constructor(private router: Router, private alertCrtl: AlertController) { }

  ngOnInit() {
  }

  async pAlertCuestionarioE() {
    const alert = await this.alertCrtl.create({
      cssClass: 'alertBox',
      header: 'Confirm!',
      message: 'message <strong>text</strong>!!',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Okay',
          handler: () => {this.router.navigate(['paciente/cuestionario-e'])}
        }
      ]
    })
    await alert.present();
  }

  goCuestionario(){
    this.router.navigate(['paciente/cuestionario'])
  }
}
