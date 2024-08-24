import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { SignupUserRequest } from 'src/app/models/interfaces/user/signup-user-request';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  loginCard = true;
  
  private destroy$ = new Subject<void>();

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
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ) { }


  onSubmitLoginForm(): void {
    console.log('FORM LOGIN DATA: ', this.loginForm.value);

    if(this.loginForm.value && this.loginForm.valid) {
      this.userService.authenticateUser(this.loginForm.value as AuthRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({next: (response) => {
        
        if(response){
          this.cookieService.set('USER_INFO', response?.token);
          this.loginForm.reset();

          this.router.navigate(['/dashboard']);

          this.messageService.add({
            severity:'success',
             summary:'Success',
             detail:`Welcome ${response?.name}`,
             life: 2000
            });
        }
    
      },
      error: (error) => {
        this.messageService.add({
          severity:'error',
           summary:'Error',
           detail:`Error to Athenticate user`,
           life: 2000
          });
        console.error('Error authenticating user: ', error);
      }});
  }
}

  onSubmitSignupForm(): void {
    console.log('FORM SIGNUP DATA: ', this.signupForm.value);

    if(this.signupForm.value && this.signupForm.valid) {
      this.userService.signupUser(this.signupForm.value as SignupUserRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({next: (response) => {
        
        if(response){
          this.signupForm.reset();
          this.loginCard = true;
          
          this.messageService.add({
            severity:'success',
             summary:'Success',
             detail:`User created successfully ${response?.name}`,
             life: 2000
            });
        }
    
      },
      error: (error) => {
        this.messageService.add({
          severity:'error',
           summary:'Error',
           detail:`Error creating user`,
           life: 2000
          });
        console.error('Error creating user: ', error);
      }});


    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
 

}
