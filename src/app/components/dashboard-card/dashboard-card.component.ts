import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {

  @Input() icon: string;
  @Input() label: string;
  @Input() counter: string;
  @Input() bgColor: string;
  @Input() textColor: string;

  constructor() { }

  ngOnInit(): void {
  }

}
