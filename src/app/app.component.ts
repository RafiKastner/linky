import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { ShortenService } from './injectables/configService'

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
  shorten = new ShortenService
  handleSubmit() {
    if (!this.inputForm.value.url) {
      throw Error('Must have valid string for url')
    }
    this.shorten.getShorten(this.inputForm.value.url).subscribe((res) => {
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