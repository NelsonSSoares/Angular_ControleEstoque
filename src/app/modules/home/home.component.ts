import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { SignupUserRequest } from 'src/app/models/interfaces/user/signup-user-request';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loginCard = true;
  
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private cookieService: CookieService
  ) { }

  onSubmitLoginForm(): void {
    console.log('FORM LOGIN DATA: ', this.loginForm.value);

    if(this.loginForm.value && this.loginForm.valid) {
      this.userService.authenticateUser(this.loginForm.value as AuthRequest)
      .subscribe({next: (response) => {
        
        if(response){
          this.cookieService.set('USER_INFO', response?.token);
          alert('User authenticated successfully');
          this.loginForm.reset();
        }
    
      },
      error: (error) => {
        console.error('Error authenticating user: ', error);
      }});
  }
}

  onSubmitSignupForm(): void {
    console.log('FORM SIGNUP DATA: ', this.signupForm.value);

    if(this.signupForm.value && this.signupForm.valid) {
      this.userService.signupUser(this.signupForm.value as SignupUserRequest)
      .subscribe({next: (response) => {
        
        if(response){
          alert('User created successfully');
          this.signupForm.reset();
          this.loginCard = true;
        }
    
      },
      error: (error) => {
        console.error('Error creating user: ', error);
      }});


    }
  }


 

}
