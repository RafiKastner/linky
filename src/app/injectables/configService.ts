import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ShortenService {
  private http = inject(HttpClient);

  getShorten(url: string) {
	return this.http.get<{ shortUrl: string }>(`/api/shorten?url=${url}`, { responseType: 'json' })
  }
}