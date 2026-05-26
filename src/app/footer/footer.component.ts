import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";


@Component({
  standalone: true,
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  imports: [RouterLink]
})
export class FooterComponent {}