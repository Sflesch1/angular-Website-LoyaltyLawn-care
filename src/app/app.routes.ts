import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact },
  { path: 'about', component: About },
  { path: '**', redirectTo: '' }
];