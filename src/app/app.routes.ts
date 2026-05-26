import { Routes } from '@angular/router';
import { RedirectComponent } from './redirect/redirect.component';
import { MainComponent } from './main/main.component';
import { DocsComponent } from './docs/docs.component';

export const routes: Routes = [
	{
		path: '',
		component: MainComponent
	},
	{
		path: 'c/:code',
		component: RedirectComponent,
	},
	{
		path: 'docs',
		component: DocsComponent,
	},
];
