import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  @Input()
  isExpanded: boolean = false;
  @Output() toggleMenu = new EventEmitter();

  public routeLinks = [
    { link: '', name: 'Food Generator', icon: 'local_dining' },
    { link: 'my-meals', name: 'My Meals', icon: 'menu_book' },
  ];
}
