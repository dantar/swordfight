import { Component, Input, OnInit } from '@angular/core';
import { SwordsService } from 'src/app/swords.service';

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

SwordsService.register({

  name: 'broadsword',

  ready: ['assets/broadsword/ready.ogg'],
  loop: [],
  swingA: ['assets/broadsword/block1.ogg'],
  swingB: ['assets/broadsword/block2.ogg'],
  swingC: ['assets/broadsword/block3.ogg'],
  swingD: ['assets/broadsword/block4.ogg'],
  missed:['assets/broadsword/missed1.ogg'],
  fatal: ['assets/broadsword/fatal1.ogg', 'assets/broadsword/fatal2.ogg'],
  sheat: ['assets/broadsword/sheat.ogg'],
  grunt: ['assets/broadsword/grunt1.ogg'],

});
