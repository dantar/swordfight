import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-broadsword]',
  templateUrl: './broadsword.component.html',
  styleUrls: ['./broadsword.component.scss']
})
export class BroadswordComponent implements OnInit {

  @Input() color: string;

  constructor() { }

  ngOnInit(): void {
  }

}
