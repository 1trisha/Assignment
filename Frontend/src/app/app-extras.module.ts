import { APP_INITIALIZER, NgModule } from '@angular/core';
import { SkyToastModule } from '@skyux/toast';

import { AppSkyModule } from './app-sky.module';
import { AppStringLoader } from './Services/configLoader.service';

export function initAppString(appLoaderService: AppStringLoader) {
  return () => {
    console.log('hello');
    return appLoaderService.load();
  };
}

@NgModule({
  exports: [AppSkyModule],
  imports: [SkyToastModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAppString,
      multi: true,
      deps: [AppStringLoader]
    }
  ]
})
export class AppExtrasModule {}
