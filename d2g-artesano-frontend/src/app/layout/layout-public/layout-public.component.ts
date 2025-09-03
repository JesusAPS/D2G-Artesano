import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-layout-public',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, HeaderComponent, RouterModule],
  templateUrl: './layout-public.component.html',
  styleUrl: './layout-public.component.css'
})
export class LayoutPublicComponent {

}
