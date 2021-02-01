import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-menu-toggle',
  templateUrl: './menu-toggle.component.html',
  styleUrls: ['./menu-toggle.component.scss']
})
export class MenuToggleComponent implements OnInit {

  constructor(private shared: SharedDataService) { }

  ngOnInit(): void {
  }

  clickMenu() {
    this.shared.showMenu = !this.shared.showMenu;
  }

}