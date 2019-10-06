import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {SignInComponent} from "./component/signin/sign-in/sign-in.component";
import {HomeComponent} from "./component/home/home.component";
import {CentersComponent} from "./component/center/centers/centers.component";
import {StudentComponent} from "./component/student/student.component";


const routes: Route[] = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'signIn', component: SignInComponent},
  {
    path: 'home', component: HomeComponent, children: [
      // {path:'', redirectTo:'centers', pathMatch:'full'}, // bo redirect ni home component ni ichida logika bilan neraman
      {path: 'centers', component: CentersComponent},
      {path: 'centers/:centername', component: CentersComponent,
        children:[
          {path:'students', component:StudentComponent}
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
