import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { sleep } from '@anthropic-ai/sdk/core.mjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, ClipboardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'linky';
  output: string = "Output";
  inputForm = new FormGroup({
    url: new FormControl('', Validators.required),
  })
  handleSubmit() {
    this.output = this.inputForm.value.url ? this.inputForm.value.url : '';
    this.inputForm.reset()
  }
  copy = false;
  handleClick() {
    this.copy = true
    setTimeout(()=> {
      this.copy = false;
    }, 2000);
  }
}