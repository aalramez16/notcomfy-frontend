import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent {
  constructor(
    private titleService: Title
  ) 
  { }

  ngOnInit(): void {
    this.titleService.setTitle('Privacy Policy - notcomfy');
  }
}
