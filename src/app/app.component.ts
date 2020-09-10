import { Component, OnInit, TemplateRef } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'job-listings-angular';
  user: SocialUser;
  loggedIn: boolean;

  modalRef: BsModalRef;
  userDetailsModalRef: BsModalRef;
  constructor(private authService: SocialAuthService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUserFromStorage();
    if (this.user === null) {
      this.getUserDetails();
    }
  }

  getUserDetails(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log({ user });
      localStorage.setItem('user', JSON.stringify(user));
      this.loggedIn = (user != null);
      if (this.loggedIn && this.modalRef) { this.modalRef.hide(); }
    });
  }

  getUserFromStorage(): void {
    const data = localStorage.getItem('user');
    const user = JSON.parse(data) as SocialUser;
    if (user) { this.loggedIn = true; this.user = { ...user }; }
  }

  showLogin(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  showUserDetails(template: TemplateRef<any>): void {
    this.userDetailsModalRef = this.modalService.show(template);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  signOut(): void {
    this.authService.signOut();
  }
}
