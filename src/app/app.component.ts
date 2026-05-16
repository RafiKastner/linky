import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'linky';
  output: string | null | undefined = "Output";
  inputForm = new FormGroup({
    url: new FormControl('', Validators.required),
  })
  handleSubmit() {
    this.output = this.inputForm.value.url;
    this.inputForm.reset()
  }
}