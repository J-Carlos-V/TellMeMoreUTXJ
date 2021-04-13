import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private AuthService: AuthService) { }

  ngOnInit(): void {
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout(): void{
    this.AuthService.logout();
  }

}
