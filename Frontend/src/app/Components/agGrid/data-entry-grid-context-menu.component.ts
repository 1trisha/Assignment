import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';

import { ICellRendererParams } from 'ag-grid-community';
import { Employee } from '../../Model/Employee';

@Component({
  selector: 'app-data-entry-grid-context-menu',
  templateUrl: './data-entry-grid-context-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataEntryGridContextMenuComponent
  implements ICellRendererAngularComp
{
  private params: ICellRendererParams;

  public agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  public refresh(): boolean {
    return false;
  }

  public actionClicked(action: string): void {
    if (action === 'Edit') {
      this.params.context.componentParent.OnEditClick(
        <Employee>this.params.data
      );
    }
    if (action === 'Delete') {
      this.params.context.componentParent.OnDeleteClick(this.params.data.id);
    }
  }
}
