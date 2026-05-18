import { Component, inject } from "@angular/core";
import { ApiService } from "../injectables/apiService";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	templateUrl: './redirect.component.html',
	styleUrl: './redirect.component.css',
})
export class RedirectComponent {
	private activatedRoute = inject(ActivatedRoute)
	code = this.activatedRoute.snapshot.paramMap.get('code') || '';
	

	private api = inject(ApiService);
	msg = ''
	body = this.api.getRedirect(this.code).subscribe({
		next: (res) =>  { 
			const s = res.originalUrl;
			window.location.href = `${s.includes('https://') || s.includes('http://') ? '' : 'https://'}${res.originalUrl}`;
		},
		error: (error: HttpErrorResponse) => this.msg = error.message,
	});
}