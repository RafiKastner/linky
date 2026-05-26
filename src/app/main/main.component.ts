import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, ValidatorFn, 
  ValidationErrors, AbstractControl } from '@angular/forms'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { ApiService } from '../injectables/apiService'
import { RouterLink } from "@angular/router";

/*
TODO:
- Footer
  - github link, docs link
- docs
  - just a page to say get at this and this for shorten and whatnot
- readme
- not so important but
- page when shortened link is loading
  - no auto redirect? at least a countdown
    - for safety or whatever
  - link to click in case wont auto redirect


*/

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, ClipboardModule, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  title = 'linky';
  output: string = "Output";
  inputForm = new FormGroup({
    url: new FormControl('', [Validators.required, 
      (control: AbstractControl): ValidationErrors | null => 
        (!/\../.test(control.value)) 
          ? { forbiddenUrl: { value: control.value } } : null
    ]),
  })
  api = inject(ApiService)
  handleSubmit() {
    if (!this.inputForm.value.url) {
      throw Error('Must have valid string for url')
    }
    this.output = "Loading..."
    this.api.getShorten(this.inputForm.value.url).subscribe((res) => {
      this.output = res.shortUrl;
    })
    this.inputForm.reset()
  }
  copy = false;
  handleClick() {
    this.copy = true
    setTimeout(()=> this.copy = false, 2000);
  }
}