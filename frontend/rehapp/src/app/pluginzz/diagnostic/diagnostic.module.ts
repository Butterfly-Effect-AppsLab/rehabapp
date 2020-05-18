import { NgModule } from "@angular/core";
import { DiagnoseComponent } from './diagnose/diagnose.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';

@NgModule({
    declarations: [
        QuestionComponent,
        DiagnoseComponent,
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        QuestionComponent,
        DiagnoseComponent,
    ]
})
export class DiagnosticModule {}