import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { AppComponent } from './app.component';
import { SourceComponent } from './source.component';
import { SourcesPanelComponent } from './sources-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    SourceComponent,
    SourcesPanelComponent,
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
