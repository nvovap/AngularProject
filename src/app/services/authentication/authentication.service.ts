import { Injectable } from '@angular/core';


import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { Router } from '@angular/router';




//npm install firebase @angular/fire --save
//npm i typescript@3.1.6 --save-dev --save-exact
//npm i -g npm-check-updates && ncu -a && npm i

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
   // private afd: AngularFireDatabase,
    private afs: AngularFirestore,
    private router: Router ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
          //return this.afd.list(`users/${user.uid}`).valueChanges()
        } else {
          return of(null);
        }
      })
    );
  }

 


  

  // ===== Authentication ===========

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  // With EMAIL
  emailSignInWithEmail(email, password) {
    return this.oAuthSingInWithEmail(email, password);
  }


  private async oAuthSingInWithEmail(email, password) {
    const credential =  await this.afAuth.auth.signInWithEmailAndPassword(email,password);
    // credential.
    return this.router.navigate(['/']);
  }

  emailSignUpWith(email, password, nip) {
    return this.oAuthSingUpWithEmail(email, password, nip);
  }

  private async oAuthSingUpWithEmail(email, password, nip) {
    const credential =  await this.afAuth.auth.createUserWithEmailAndPassword(email,password);

    return this.updateUserData(credential.user, nip);
  }


  // with GOOGLE
  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLoginWithGoogle(provider);
  }

  private async oAuthLoginWithGoogle(provider) {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.router.navigate(['/']);
  }

  private updateUserData({ uid, email, displayName, photoURL }, nip) {
 
    const data = {
      uid,
      email,
      displayName,
      photoURL,
      nipOrganisation: nip,
    };

    this.router.navigate(['/']);


    return this.afs.collection('users').doc(uid).set(data)
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/login']);
  }
}
