import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit
} from '@angular/core';

import {
  GridApi,
  GridReadyEvent,
  GridOptions,
  ICellRendererParams
  // ValueFormatterParams,
} from 'ag-grid-community';

import { SkyCellType, SkyAgGridService } from '@skyux/ag-grid';

import { SkyModalService, SkyModalCloseArgs } from '@skyux/modals';
import { Employee } from '../../Model/Employee';
import { EmployeeModalComponent } from '../Modals/employee-modal.component';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../../Services/Employee.service';
import { DataEntryGridContextMenuComponent } from './data-entry-grid-context-menu.component';
import { SkyWaitService } from '@skyux/indicators';
import { AppStringLoader } from '../../Services/configLoader.service';
import { SkyToastService, SkyToastType } from '@skyux/toast';

@Component({
  selector: 'app-ag-grid-test',
  templateUrl: './ag-grid-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgGridTestComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.gridApi) this.gridApi.sizeColumnsToFit();
  }
  public editTable = false;
  public modalSize: string = 'medium';
  public employees: Employee[];
  public columnDefs: any;
  public gridApi: GridApi;
  public gridOptions: GridOptions;
  public searchText: string;
  public translations: any;
  public successMessage: string;

  constructor(
    private agGridService: SkyAgGridService,
    private modalService: SkyModalService,
    private employeeService: EmployeeService,
    private waitSvc: SkyWaitService,
    private configService: AppStringLoader,
    private toastService: SkyToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.columnDefs = [
      {
        field: 'name',
        headerName: 'Name',
        type: SkyCellType.Text,
        sort: 'asc',
        headerValueGetter: this.localizeHeader.bind(this)
      },
      {
        field: 'experience',
        headerName: 'Experience',
        type: SkyCellType.Number,
        maxWidth: 100,
        headerValueGetter: this.localizeHeader.bind(this)
      },
      {
        field: 'dateOfJoining',
        headerName: 'DOJ',
        type: SkyCellType.Date,
        headerValueGetter: this.localizeHeader.bind(this)
      },
      {
        field: 'skills',
        headerName: 'skills',
        sortable: false,
        headerValueGetter: this.localizeHeader.bind(this)
      },
      {
        colId: 'context',
        headerName: '',
        maxWidth: 50,
        sortable: false,
        cellRendererFramework: DataEntryGridContextMenuComponent
      }
    ];
  }

  public ngOnInit(): void {
    this.gridOptions = {
      context: {
        componentParent: this
      },
      columnDefs: this.columnDefs,
      onGridReady: (gridReadyEvent) => this.onGridReady(gridReadyEvent),
      pagination: true,
      paginationPageSize: 2
    };
    this.gridOptions = this.agGridService.getGridOptions({
      gridOptions: this.gridOptions
    });
    this.waitSvc.beginBlockingPageWait();
    this.loadEmployees();
  }

  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;

    this.gridApi.sizeColumnsToFit();
  }

  public localizeHeader(parameters: ICellRendererParams): string {
    let headerIdentifier = parameters.colDef.headerName;
    return this.configService.loadedTranslations[headerIdentifier];
  }

  openModal(mode: string, employee?: Employee): void {
    if (mode == 'Add') {
      employee = new Employee();
    }
    // to open modal
    const modalType: any = EmployeeModalComponent;
    const options: any = {
      size: this.modalSize,
      providers: [
        {
          provide: Employee,
          useValue: employee
        },
        {
          provide: String,
          useValue: mode + ' Employee'
        }
      ]
    };
    const openedInstance = this.modalService.open(modalType, options);

    // on close of instance
    openedInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'save' && mode == 'Add') {
        const formData: FormGroup = result.data;
        let emp: Employee = {
          id: '',
          name: formData.controls.name.value,
          dateOfJoining: formData.controls.doj.value,
          experience: formData.controls.experience.value,
          skills: formData.controls.skills.value?.map(
            (skill: { name: string }) => skill.name
          )
        };
        this.waitSvc.beginBlockingPageWait();
        this.employeeService.AddEmployees(emp).subscribe((emp) => {
          this.successMessage = 'Created Employee succcesfully';
          this.loadEmployees();
        });
      } else if (result.reason === 'save' && mode == 'Edit') {
        const formData: FormGroup = result.data;
        let emp: Employee = {
          id: employee.id,
          name: formData.controls.name.value,
          dateOfJoining: formData.controls.doj.value,
          experience: formData.controls.experience.value,
          skills: formData.controls.skills.value?.map(
            (skill: { name: string }) => skill.name
          )
        };
        this.waitSvc.beginBlockingPageWait();
        this.employeeService.EditEmployee(emp).subscribe((_) => {
          this.successMessage = 'Edited Employee succcesfully';
          this.loadEmployees();
        });
      }
    });
  }

  OnEditClick(employee: Employee) {
    this.openModal('Edit', employee);
  }

  OnDeleteClick(id: number) {
    this.waitSvc.beginBlockingPageWait();
    this.employeeService.DeleteEmployee(id).subscribe((_) => {
      this.successMessage = 'Deleted employee succesfully';
      this.loadEmployees();
    });
  }

  public searchApplied(searchText: string): void {
    this.searchText = searchText;
    this.gridApi.setQuickFilter(searchText);
  }

  private loadEmployees() {
    this.employeeService.GetEmployees().subscribe(
      (value: Array<Employee>) => {
        this.employees = value;
        this.waitSvc.endBlockingPageWait();
        if (this.successMessage) {
          this.toastService.openMessage(this.successMessage, {
            type: SkyToastType.Success,
            autoClose: true
          });
          this.successMessage = '';
          this.cdr.detectChanges();
        }
      },
      (_) => {
        this.employees = [];
        this.toastService.openMessage('Failed to load employees', {
          type: SkyToastType.Danger,
          autoClose: true
        });
        this.successMessage = '';
        this.cdr.detectChanges();
      }
    );
  }
}
