import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppString } from '../Interfaces/iAppstring';
import { SkyAppAssetsService } from '@skyux/assets';
import { SkyAppResourcesService } from '@skyux/i18n';
import { forkJoin } from 'rxjs';

@Injectable()
export class AppStringLoader {
  constructor(
    private httpClient: HttpClient,
    private skyAppAsset: SkyAppAssetsService,
    private translateService: SkyAppResourcesService
  ) {}

  public loadedTranslations: any;
  public loadedConfig: IAppString;

  public load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      forkJoin({
        //property:Observable
        first: this.loadConfig(),
        second: this.loadTranslations()
      }).subscribe(
        (value) => {
          this.loadedConfig = value.first;
          this.loadedTranslations = value.second;
          resolve(true);
        },
        (error) => {
          reject('error loading config or translation' + error);
        }
      );
    });
  }

  loadConfig() {
    const url = this.skyAppAsset.getUrl('appstrings.json');
    return this.httpClient.get<IAppString>(url);
  }

  loadTranslations() {
    return this.translateService.getStrings({
      Name: 'Name',
      Experience: 'Experience',
      DOJ: 'DOJ',
      skills: 'skills'
    });
  }
}
