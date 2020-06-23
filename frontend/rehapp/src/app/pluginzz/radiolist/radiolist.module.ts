import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RadioListComponent } from './radiolist.component';

@NgModule({
    declarations: [
        RadioListComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        RadioListComponent
    ]
})
export class RadioListModule {}