import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ComicsService } from 'src/app/services/comics.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environment/environtment';
import { DateTime } from 'luxon'

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit, OnDestroy {
  constructor(
    public comicsService: ComicsService,
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    ) 
  { }

  subscription: any;
  imageLoading = false;
  mostRecentIssue: any = {};
  currentIssue: any = {};
  imageToShow: any;
  issues: any = [];
  nextIssue: any;
  prevIssue: any;


  ngOnInit(): void {
    this.titleService.setTitle('Comics - notcomfy')
    this.subscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && e.urlAfterRedirects.split('/').length === 3) {
        const urlArray = e.urlAfterRedirects.split('/');
        this.getIssuesDataFromService(urlArray[urlArray.length - 1]);
      }
    })
    this.getIssuesDataFromService();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Get list of comic details from the API
  getIssuesDataFromService(issueNumber?: string) {
    this.comicsService.getIssuesData().subscribe({
      next: (data: any) => {
        // Assign issues to this.issues
        this.issues = data.data;
        this.assessIfIssueIsNew()
        this.mostRecentIssue = this.issues[0];

        if (this.route.snapshot.url.length == 2 && !issueNumber) {
          issueNumber = this.route.snapshot.url[1].path
        }
        const currentIssueNumber = issueNumber? issueNumber : this.mostRecentIssue.issue_number;
        this.getImageFromService(currentIssueNumber);
        this.currentIssue = this.issues.find((issue: any) => issue.issue_number === currentIssueNumber);
        this.titleService.setTitle(`${this.currentIssue.issue_number} - ${this.currentIssue.issue_title} - Comics - notcomfy`);
        this.nextIssue = this.issues[this.issues.indexOf(this.currentIssue) - 1] || null;
        this.prevIssue = this.issues[this.issues.indexOf(this.currentIssue) + 1] || null;
        // Fetch image for current issue
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // Get image from the API
  getImageFromService(issue_number: string) {
    this.imageLoading = true;
    this.comicsService.getImage(`${environment.apiUrl}/comics/${issue_number}`).subscribe({
      next: (data: any) => {
        this.createImageFromBlob(data);
        this.imageLoading = false;
      },
      error: (error) => {
        this.imageLoading = false;
        console.error(error);
      }
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  assessIfIssueIsNew() {
    this.issues.forEach((issue: any) => {
      const releaseDate = DateTime.fromFormat(issue.release_date, 'yyyy-MM-dd');
      const today = DateTime.now();
      if (today.diff(releaseDate, 'days').as('days') <= 7) {
        issue.is_new = true;
      }
    });

  }
}
