import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[app-cast-card]',
  templateUrl: './cast-card.component.html',
  styleUrls: ['./cast-card.component.css']
})
export class CastCardComponent implements OnInit {

  @Input() image: string;
  @Input() name: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
