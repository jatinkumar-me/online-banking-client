import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Account } from '../account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  @Input() account?: Account;

  constructor(private location: Location) {}

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }
}
