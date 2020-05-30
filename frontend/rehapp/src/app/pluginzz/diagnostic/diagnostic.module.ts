import { NgModule } from "@angular/core";
import { DiagnoseComponent } from './diagnose/diagnose.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { ToggleComponent } from './toggle/toggle.component';
import { BodyComponent } from '../body/body.component';

@NgModule({
    declarations: [
        QuestionComponent,
        DiagnoseComponent,
        ToggleComponent,
        BodyComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        QuestionComponent,
        DiagnoseComponent,
        ToggleComponent,
        BodyComponent
    ]
})
export class DiagnosticModule {}