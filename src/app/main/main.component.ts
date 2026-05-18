import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, ValidatorFn, 
  ValidationErrors, AbstractControl } from '@angular/forms'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { ApiService } from '../injectables/apiService'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, ClipboardModule],
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