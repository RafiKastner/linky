import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  getShorten(url: string) {
	  return this.http.get<{ shortUrl: string }>(`/api/shorten?url=${url}`, { responseType: 'json' })
  }

  getRedirect(code: string) {
    return this.http.get<{ originalUrl: string }>(`/api/redirect?code=${code}`, {responseType: 'json' })
  }
}