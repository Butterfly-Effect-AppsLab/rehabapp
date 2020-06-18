import { NgModule } from "@angular/core";
import { DiagnoseComponent } from './diagnose/diagnose.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { ToggleComponent } from './toggle/toggle.component';
import { BodyComponent } from '../body/body.component';
import { SubpartComponent } from '../subpart/subpart.component';

@NgModule({
    declarations: [
        QuestionComponent,
        DiagnoseComponent,
        ToggleComponent,
        BodyComponent,
        SubpartComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        QuestionComponent,
        DiagnoseComponent,
        ToggleComponent,
        BodyComponent,
        SubpartComponent
    ]
})
export class DiagnosticModule {}