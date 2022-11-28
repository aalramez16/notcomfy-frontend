import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ComicsComponent } from './components/comics/comics.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'comics', pathMatch: 'full'},
  { path: 'comics', component: ComicsComponent, pathMatch: 'full' },
  { path: 'comics/:issue', component: ComicsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
