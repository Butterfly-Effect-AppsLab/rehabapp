import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from './toggle/toggle.component';
import { BodyComponent } from './body/body.component';

@NgModule({
    declarations: [
        ToggleComponent,
        BodyComponent,
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        ToggleComponent,
        BodyComponent,
    ]
})
export class BodyModule {}