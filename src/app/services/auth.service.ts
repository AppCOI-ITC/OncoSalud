import { Injectable } from '@angular/core';
import { User } from "../shared/user.interface";
import { AngularFireAuth } from "@angular/fire/auth";

import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from 'rxjs';
import { map, switchMap } from "rxjs/operators";
import { Router } from '@angular/router';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { AuthGuard } from '../shared/auth.guard';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user$: Observable<User>;

  constructor(private afAuth:AngularFireAuth, private afs: AngularFirestore, private router:Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user)=>{
        if(user){
          console.log('pase por aca');
          return this.afs.doc<User>(`DataUsuarios/${user.uid}`).valueChanges();
        }
        return of(null);
      }) 
    );
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
  
  async login(email: string, password: string): Promise<User> {
    try {
      const {user} = await this.afAuth.signInWithEmailAndPassword(email, password);
      // this.updateUserdata(user);
      this.redirectUser();
      return user
    } catch (error) {
      console.log('error->',error)
    }
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

  private updateUserdata(user:User) {
    const userRef:AngularFirestoreDocument<User> = this.afs.doc(`Datausuarios/${user.uid}`);
    const ref = this.afs.doc(`Datausuario/${user.uid}`)
    const data = {
      email: user.email,
      isAdmin: false,
    }
    console.log(ref.get())
    // const data: User = {
    //   uid: user.uid,
    //   email: user.email,
    // };

    return ref.set(data);
  }

  private redirectUser(){
      this.router.navigate(['/home-p']);
  }

}