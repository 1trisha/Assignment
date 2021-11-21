import { NgModule } from '@angular/core';

import { SkyAvatarModule } from '@skyux/avatar';

import {
  SkyAlertModule,
  SkyKeyInfoModule,
  SkyWaitModule,
  SkyWaitService
} from '@skyux/indicators';

import {
  SkyBackToTopModule,
  SkyCardModule,
  SkyFluidGridModule,
  SkyToolbarModule
} from '@skyux/layout';

import { SkyNavbarModule } from '@skyux/navbar';
import { SkyGridModule } from '@skyux/grids';

import { SkyAutocompleteModule } from '@skyux/lookup';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from './Services/Employee.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  SkyListFiltersModule,
  SkyListModule,
  SkyListSecondaryActionsModule,
  SkyListToolbarModule
} from '@skyux/list-builder';
import {
  SkyFilterModule,
  SkyInfiniteScrollModule,
  SkyRepeaterModule
} from '@skyux/lists';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkyCheckboxModule, SkyRadioModule } from '@skyux/forms';
import { SkyListViewGridModule } from '@skyux/list-builder-view-grids';
import { SkyIconModule } from '@skyux/indicators';
import { SkyDropdownModule } from '@skyux/popovers';
import {
  SkyModalModule,
  SkyModalHostService,
  SkyModalConfiguration,
  SkyModalCloseArgs,
  SkyModalInstance,
  SkyModalService
} from '@skyux/modals';
import { SkyInputBoxModule } from '@skyux/forms';
import { SkyDatepickerModule } from '@skyux/datetime';
import { SkyLookupModule, SkySearchModule } from '@skyux/lookup';
import { AppStringLoader } from './Services/configLoader.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from './gaurds/auth.guards';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './Services/Interceptor/token.interceptor';
import { SkyAgGridModule, SkyAgGridService } from '@skyux/ag-grid';
import { SkyAutonumericModule } from '@skyux/autonumeric';
import { SkyDataManagerModule } from '@skyux/data-manager';
import { SkyAppLinkModule } from '@skyux/router';
import { AgGridModule } from 'ag-grid-angular';
import { SkyThemeService } from '@skyux/theme';
import { SkyAppResourcesService } from '@skyux/i18n';
import { ErrorInterceptor } from './Services/Interceptor/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandleService } from './Services/error-handle.service';

export function initAppString(appLoaderService: AppStringLoader) {
  return () => appLoaderService.load();
}

@NgModule({
  exports: [
    SkyAvatarModule,
    SkyAlertModule,
    SkyKeyInfoModule,
    SkyFluidGridModule,
    SkyNavbarModule,
    SkyAutocompleteModule,
    SkyGridModule,
    SkyListToolbarModule,
    SkyDropdownModule,
    SkyFilterModule,
    SkyIconModule,
    SkyListFiltersModule,
    SkyListModule,
    SkyListSecondaryActionsModule,
    SkyListViewGridModule,
    SkyRadioModule,
    ReactiveFormsModule,
    FormsModule,
    SkyListModule,
    SkyModalModule,
    SkyModalHostService,
    SkyModalConfiguration,
    SkyModalCloseArgs,
    SkyInputBoxModule,
    SkyDatepickerModule,
    SkyLookupModule,
    SkyWaitModule,
    SkyCardModule,
    SkyAgGridModule,
    AgGridModule,
    SkyAppLinkModule,
    SkyAutonumericModule,
    SkyCheckboxModule,
    SkyDataManagerModule,
    SkyInfiniteScrollModule,
    SkyRepeaterModule,
    SkySearchModule,
    SkyToolbarModule,
    SkyBackToTopModule
  ],
  imports: [
    SkyAutocompleteModule,
    SkyGridModule,
    CommonModule,
    HttpClientModule,
    SkyListToolbarModule,
    FormsModule,
    SkyModalModule,
    SkyListModule,
    SkyDatepickerModule,
    SkyLookupModule,
    SkySearchModule,
    SkyWaitModule,
    AppRoutingModule,
    SkyCardModule,
    SkyAgGridModule,
    AgGridModule,
    SkyAgGridModule,
    SkyAppLinkModule,
    SkyAutonumericModule,
    SkyCheckboxModule,
    SkyDataManagerModule,
    SkyDropdownModule,
    SkyInfiniteScrollModule,
    SkyModalModule,
    SkyRepeaterModule,
    SkySearchModule,
    SkyToolbarModule,
    SkyBackToTopModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule
  ],

  providers: [
    HttpClient,
    EmployeeService,
    DatePipe,
    SkyModalHostService,
    SkyModalConfiguration,
    SkyModalInstance,
    SkyModalService,
    AppStringLoader,
    AuthService,
    Router,
    AuthGuard,
    SkyAgGridService,
    SkyThemeService,
    SkyWaitService,
    SkyAppResourcesService,
    ErrorHandleService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AppSkyModule {}
