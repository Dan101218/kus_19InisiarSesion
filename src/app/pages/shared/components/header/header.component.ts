import { Component, Injectable, Input, inject } from '@angular/core';
import { SidebarServiceService } from '../../services/sidebar-service.service';

@Component({
  selector: 'app-header', // Asegúrate de que el selector sea 'app-header'
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent { 
  @Input()  nombre!:string;
  statusSidebar:boolean = true;
  _sidebarService = inject(SidebarServiceService)

  public effectSidebar(){
    this.statusSidebar = ! this.statusSidebar;
    this._sidebarService.largeSidebar(this.statusSidebar);
    // console.log(this.statusSidebar)
  }
}
