import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAdmin = false;
  isLogged = false;
  private subscription : Subscription = new Subscription();


  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private AuthService: AuthService) { }


  ngOnInit(): void {
    this.subscription.add(
    this.AuthService.isLogged.subscribe((res)=> (this.isLogged = res))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout(): void{
    this.AuthService.logout();
  }

}
