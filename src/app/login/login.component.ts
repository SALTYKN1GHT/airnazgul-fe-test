import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/interfaces/user';
import { HttpService } from 'src/services/http.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthenticationService } from 'src/services/authentication.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() loginVisible: boolean;
  @Output() modalStateChange = new EventEmitter<boolean>();
  @Output() userLoginEvent = new EventEmitter<User['user']>();
  @ViewChild('CloseButton') CloseButton: ElementRef;
  public formData = { email: '', password: '' };
  public registerData = { userName: '', email: '', password: '' };

  public isRegisteredSuccessful: boolean = false;
  public registerVisible: boolean = false;
  private userInSubject = new Subject<string[]>();
  public userValidateMsg: string = '';
  public userValidateStatus: boolean = true;
  public userValidateMsgVisible: boolean = false;
  public defUserInputClass: boolean = true;

  private emailInSubject = new Subject<string[]>();
  public emailValidateStatus: boolean;
  public emailValidateMsgVisible: boolean = false;
  public emailValidateMsg: string = '';
  public defEmailInputClass: boolean = true;

  private passInSubject = new Subject<string[]>();
  public passValidateStatus: boolean;
  public passValidateMsgVisible: boolean = false;
  public passValidateMsg: string = '';
  public defPassInputClass: boolean = true;
  public passToShort: boolean = false;
  public passToLong: boolean = true;
  public passLCase: boolean = false;
  public passUCase: boolean = false;
  public passSpecChr: boolean = false;
  public passNumChr: boolean = false;
  public showPassword: boolean = false;

  constructor(private authService: AuthenticationService, private httpService: HttpService) {}
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  togglePassword(event: MouseEvent) {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('login-password') as HTMLInputElement;
    passwordField.type = this.showPassword ? 'text' : 'password';
  }

  async onSubmit(form: any) {
    let result = await this.authService.login(form);
    if (!!result) {
      this.emailValidateStatus = true;
      this.passValidateStatus = true;
      this.defEmailInputClass = false;
      this.defPassInputClass = false;
      this.passValidateMsgVisible = false;
      setTimeout(() => {
        this.userLoginEvent.emit(result?.user);
        this.closeModal();
        form.reset();
      }, 1000);
    } else {
      this.passValidateMsgVisible = true;
      this.passValidateMsg = 'Wrong username or password';
      this.emailValidateStatus = false;
      this.defEmailInputClass = false;
      this.passValidateStatus = false;
      this.defPassInputClass = false;
    }
  }

  closeModal() {
    this.modalStateChange.emit(false);
    (this.CloseButton.nativeElement as HTMLButtonElement).click();
    this.defEmailInputClass = true;
    this.defPassInputClass = true;
    this.defUserInputClass = true;
  }
  validateUsername(username: string) {
    if (username.length < 8) {
      this.defUserInputClass = false;
      this.userValidateStatus = false;
      this.userValidateMsgVisible = true;
      this.userValidateMsg = 'Username must be atleast 8 characters long.';
    } else if (username.length > 20) {
      this.defUserInputClass = false;
      this.userValidateStatus = false;
      this.userValidateMsgVisible = true;
      this.userValidateMsg = 'Username must not exceed 20 characters.';
    } else {
      this.defUserInputClass = false;
      this.userValidateStatus = true;
      this.userValidateMsgVisible = false;
    }
  }
  validateEmail(email: string[]) {
    if (email[0].includes('@') && !email[0].includes(' ') && email[0].includes('.')) {
      this.httpService.post<{ availabilityStatus: boolean; message: string }>('user/validateemail', email).subscribe(
        response => {
          this.emailValidateStatus = response.availabilityStatus;
          this.defEmailInputClass = false;
          setTimeout(() => (this.emailValidateMsgVisible = false), 4000);
        },
        (error: any) => {
          this.emailValidateMsgVisible = true;
          this.emailValidateMsg = error.error.message;
          this.emailValidateStatus = error.error.availabilityStatus;
          this.defEmailInputClass = false;
        }
      );
    } else {
      this.defEmailInputClass = false;
      this.emailValidateStatus = false;
      this.emailValidateMsgVisible = true;
      this.emailValidateMsg = 'Please type in a valid email adress';
    }
  }
  validatePassword(password: string) {
    this.defPassInputClass = false;
    this.passValidateStatus = false;
    if (password.length < 8) {
      this.passToShort = true;
    } else {
      this.passToShort = false;
    }
    if (password.length > 32) {
      this.passToLong = true;
    } else {
      this.passToLong = false;
    }
    if (/[aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz]/.test(password)) {
      this.passLCase = true;
    } else {
      this.passLCase = false;
    }
    if (/[AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ]/.test(password)) {
      this.passUCase = true;
    } else {
      this.passUCase = false;
    }
    if (/[!“#$%&’()*+,-./:;<=>?@[\]^_`{|}~,?]/.test(password)) {
      this.passSpecChr = true;
    } else {
      this.passSpecChr = false;
    }
    if (/[1234567890]/.test(password)) {
      this.passNumChr = true;
    } else {
      this.passNumChr = false;
    }
    if (
      password.length > 8 &&
      password.length < 32 &&
      /[aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz]/.test(password) &&
      /[AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ]/.test(password) &&
      /[!“#$%&’()*+,-./:;<=>?@[\]^_`{|}~,?]/.test(password) &&
      /[1234567890]/.test(password)
    ) {
      this.passValidateStatus = true;
      setTimeout(() => (this.passValidateMsgVisible = false), 3000);
    }
  }

  onSearch(event: KeyboardEvent): void {
    const searchInput: string[] = [(event.target as HTMLInputElement).value];
    const inputFieldId: string = (event.target as HTMLInputElement).id;
    switch (inputFieldId) {
      case 'username':
        this.userInSubject.next(searchInput);
        this.userInSubject.pipe(debounceTime(2000)).subscribe(username => this.validateUsername(username[0]));
        break;
      case 'email':
        this.emailInSubject.next(searchInput);
        this.emailInSubject.pipe(debounceTime(2000)).subscribe(email => this.validateEmail(email));
        break;
      case 'password':
        this.passValidateMsgVisible = true;
        this.passInSubject.next(searchInput);
        this.passInSubject.pipe(debounceTime(2000)).subscribe(password => this.validatePassword(password[0]));
        break;
    }
  }
  async onRegister(form: any) {
    const registerResult = await this.authService.register(form);

    if (!!registerResult) {
      this.isRegisteredSuccessful = true;
    }

    setTimeout(() => {
      this.closeModal();
      this.isRegisteredSuccessful = false;
      form.reset();
    }, 4000);
  }
}
