import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { AppComponent } from './app.component';
import { SourcePanelComponent } from './source-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    SourcePanelComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DropDownsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
