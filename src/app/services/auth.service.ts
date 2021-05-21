import { Observable, of } from 'rxjs';
import { map, switchMap, switchMapTo, take } from "rxjs/operators";
import { Router } from '@angular/router';
import { Injectable, Query } from '@angular/core';
import { User } from "../shared/user.interface";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { ReactiveFormsModule } from '@angular/forms';

//Este archivo tiene los metodos de AuthService los cuales se utilizan para
//el logueo, el registro, la recuperacion del password y del envio de un correo de confirmacion

//to do:
//finalizar la funcion de actualizacion de informacion de usuario


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user$: Observable<User>; //variable pipe que permitira su lectura desde 
  public userR$: Observable<Object>;

  constructor(private afAuth:AngularFireAuth, private afs: AngularFirestore, private router:Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user)=>{
        if(user){
          return this.afs.doc<User>(`userData/${user.uid}`).valueChanges();
        }
        return of(null);
      }) 
    );
    this.userR$ = this.afAuth.authState.pipe(
      switchMap((userR)=>{
        console.log('hola que acelga')
        if(userR){
          return this.afs.collection(`questResponses`).valueChanges();
        }
      })
    )
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const {user}= await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log('error->',error)
    }
  }
  
  async login(email: string, password: string): Promise<string> {
    return await this.afAuth.signInWithEmailAndPassword(email, password).then((user)=> this.redirectUser())
      .catch((error)=> error['code'])
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->',error);
    }
  }
  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('error->',error)
    }
  }
  
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('error->',error)
    }
  }

  readData() {
    return this.afs.collection(`questResponses`).snapshotChanges();
  }

  private updateUserdata(user:User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`Datausuarios/${user.uid}`);
    const ref = this.afs.doc(`userData/${user.uid}`)
    const refa = this.afs.doc(`questResponses/cZ8ZLNK9QlmIavYNewnp`)
    // this.userR$.subscribe(data=>{
    //   // console.log(data['responses'][0]['cCode']);
    //   console.log(data[0]);
    // })

    // const data = {
    //   personalData: {
    //     dni: 43834029,
    //     gender: "masculino",
    //     name: {
    //       fName: "Francisco Nicolas",
    //       lName: "Calderon Acosta"
    //     },
    //     age: 19,
    //     birth: '09-12-2001',
    //     adress: 'Prueba 123',
    //     dCode: "codigodealgo",
    //     mail: 'cfrancisco23273@gmail.com'
    //   },
    //   UID_COI: "algo de ejemplo",
    //   cCode: '001',
    //   accessLevel: 0,
    //   isFirstAccess: True
    // };
    const dataResponses = {
      USER_UID: user.uid,
      responses: [
        {
          date: '18-5-2021',
          cCode: '001',
          response: [1,2,3,4,1,2],
        },
      ]
    };
    // console.log(ref.get())
    // console.log('se updateo algo, ni idea que');
    refa.set(dataResponses);
    // return ref.set(data);
  }

  private redirectUser(){
    this.router.navigate(['paciente/']);
  }

}