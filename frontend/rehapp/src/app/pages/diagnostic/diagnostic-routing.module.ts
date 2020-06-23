import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 
const routes: Routes = [
  {
    path: '',
    redirectTo: 'selection'
  },
  {
    path: 'self-diagnostic',
    loadChildren: () => import('./self-diagnostic/self-diagnostic.module').then(m => m.SelfDiagnosticPageModule)
  },
  {
    path: 'selection',
    loadChildren: () => import('./body-part-selection/body-part-selection.module').then(m => m.BodyPartSelectionPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'choice',
    loadChildren: () => import('./prediagnostic-choice/prediagnostic-choice.module').then( m => m.PrediagnosticChoicePageModule)
  },

]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosticRoutingModule {}
