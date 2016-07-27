import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {CollapseDirective, DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { Auth } from '../auth/index';

@Component({
  moduleId: module.id,
  selector: 'sd-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  directives: [ROUTER_DIRECTIVES, CollapseDirective, DROPDOWN_DIRECTIVES],
  providers: [Auth]
})

export class HeaderComponent {

  public isCollapsed: boolean;

  public constructor(private auth: Auth) {
    this.isCollapsed = true;
  }
}
