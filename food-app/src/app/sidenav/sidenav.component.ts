import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input()
  isExpanded: boolean = false;
  @Output() toggleMenu = new EventEmitter();

  public routeLinks = [
    { link: '', name: 'Food Generator', icon: 'local_dining' },
    { link: 'nav', name: 'Navigation', icon: 'local_dining' },
  ];
}
