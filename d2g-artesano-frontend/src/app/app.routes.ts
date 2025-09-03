import { Routes } from '@angular/router';

//Layout
import { LayoutPublicComponent } from './layout/layout-public/layout-public.component'; //Componente de layout público
import { LayoutPrivateComponent } from './layout/layout-private/layout-private.component';{} //Componente de layout privado

//Paginas Publicas 
import { HomeComponent } from './pages/home/home.component'; //Componente de la página de inicio
import { CursosComponent } from './pages/cursos/cursos.component'; //Componente de la página de cursos
import { CourseDetailComponent } from './pages/cursos/course-detail/course-detail.component'; //Componente de detalle del curso
import { CarritoComponent } from './pages/carrito/carrito.component'; //Componente de la página de carrito
import { LoginComponent } from './pages/login/login.component'; //Componente de la página de login
import { RegisterComponent } from './pages/register/register.component'; //Componente de la página de registro
import { ShopComponent } from './pages/shop/shop.component'; //Componente de la página de tienda
import { ContactComponent } from './pages/contact/contact.component'; //Componente de la página de contacto
import { NosotrosComponent } from './pages/nosotros/nosotros.component'; //Componente de la página de nosotros
import { FaqComponent} from './pages/faq/faq.component'; //Componente de la página de preguntas frecuentes

//Paginas Privadas 
import { PerfilComponent } from './pages/perfil/perfil.component'; //Componente de la página de perfil del usuario
import { InstructorProfileComponent } from './pages/instructor-profile/instructor-profile.component'; //Componente de la página de perfil del instructor
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component'; //Componente del panel de administración


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Rutas públicas
  {
    path: '',
    component: LayoutPublicComponent,
    children: [
      { path: 'home', component: HomeComponent }, // Ruta para la página de inicio
      { path: 'cursos', component: CursosComponent }, // Ruta para la página de cursos
      { path: 'cursos/:id', component: CourseDetailComponent }, // Ruta para el detalle del curso
      { path: 'shop', component: ShopComponent }, // Ruta para la página de tienda
      { path: 'carrito', component: CarritoComponent }, // Ruta para la página de carrito
      { path: 'login', component: LoginComponent }, // Ruta para la página de login
      { path: 'register', component: RegisterComponent }, // Ruta para la página de registro
      { path: 'contact', component: ContactComponent }, // Ruta para la página de contacto
      { path: 'nosotros', component: NosotrosComponent }, // Ruta para la página de nosotros
      { path: 'faq', component: FaqComponent } // Ruta para la página de preguntas frecuentes
    ]
  },

  // Rutas privadas
  {
    path: '',
    component: LayoutPrivateComponent,
    children: [
      { path: 'perfil', component: PerfilComponent }, // Ruta para la página de perfil del usuario
      { path: 'instructor/:id', component: InstructorProfileComponent }, // Ruta para la página de perfil del instructor
      { path: 'admin', component: AdminDashboardComponent } // Ruta para el panel de administración
    ]
  },

  // Comodín (404)
  { path: '**', redirectTo: 'home' }
];
