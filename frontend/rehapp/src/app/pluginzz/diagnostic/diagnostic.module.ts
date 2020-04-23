import { NgModule } from "@angular/core";
import { YesnoComponent } from './yesno/yesno.component';
import { DiagnoseComponent } from './diagnose/diagnose.component';
import { MultiOptComponent } from './multi-opt/multi-opt.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BlueDirective } from 'src/app/directives/blue.directive';

@NgModule({
    declarations: [
        YesnoComponent,
        MultiOptComponent,
        DiagnoseComponent,
        BlueDirective
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        YesnoComponent,
        MultiOptComponent,
        DiagnoseComponent,
    ]
})
export class DiagnosticModule {}