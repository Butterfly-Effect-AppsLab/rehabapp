import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { OwnersComponent } from './owners/owners.component';
import { OwnerComponent } from './owners/owner/owner.component';
import { InfoComponent } from './info/info.component';

@NgModule({
    declarations: [
        WelcomeComponent,
        OwnersComponent,
        OwnerComponent,
        InfoComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        WelcomeComponent,
        OwnersComponent,
        OwnerComponent,
        InfoComponent
    ]
    
})
export class OnboardingModule {}