import { Component, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AiService } from '../../services/ai.service';
import { Ai } from '../../models/ai.model';
import { NewAi } from '../../models/new-ai.model';
import { defaultIfEmpty, map, Observable } from 'rxjs';


interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-crud',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,

    ],
                    // <p-button severity="secondary" label="Delete" icon="pi pi-trash" outlined (onClick)="deleteSelectedProducts()" [disabled]="!selectedProducts || !selectedProducts.length" />

    template: `
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="openNew()" />
            </ng-template>

            <ng-template #end>
                <p-button label="Export" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="(sortedAis$ | async) || []" 
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedProducts"
            [rowHover]="true"
            dataKey="id"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Manage my AIs</h5>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
                    </p-iconfield>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th style="width: 3rem">
                        <p-tableHeaderCheckbox />
                    </th>
                    <th pSortableColumn="model" style="min-width:16rem">
                        Model name
                        <p-sortIcon field="model" />
                    </th>

                    <th pSortableColumn="url" style="min-width:10rem">
                        Url
                        <p-sortIcon field="url" />
                    </th>
<th pSortableColumn="isActive" style="min-width:16rem">
                        Is active
                        <p-sortIcon field="isActive" />
                    </th>
                    <th style="min-width: 12rem"></th>
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>
                    <td style="width: 3rem">
                        <p-tableCheckbox [value]="product" />
                    </td>
                    <td style="min-width: 16rem">{{ product.model }}</td>

                    <td>{{ product.url }}</td>
<td class="px-4 py-2">
    <!-- Icon for service status -->
    <span class="inline-flex items-center">
        <!-- If active, show green checkmark icon -->
        <svg *ngIf="product.isActive" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>

        <!-- If not active, show red error icon -->
        <div *ngIf="!product.isActive"> 
        <svg  xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
         </div>
       
    </span>

</td>


                    <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editProduct(product)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deleteProduct(product)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-dialog [(visible)]="productDialog" [style]="{ width: '450px' }" header="Ai Details" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <div>
                        <label for="model" class="block font-bold mb-3">Model</label>
                        <input type="text" pInputText id="model" [(ngModel)]="product.model" required autofocus fluid />
                        <small class="text-red-500" *ngIf="submitted && !product.model">Model is required.</small>
                    </div>

                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-6">
                            <label for="url" class="block font-bold mb-3">Url</label>
                            <input type="text" pInputText id="url" [(ngModel)]="product.url" required autofocus fluid />
                        </div>
                        <div class="col-span-6">
                            <label for="key" class="block font-bold mb-3">Key</label>
                            <input type="text" pInputText id="key" [(ngModel)]="product.key" required autofocus fluid />
                        </div>
                    </div>
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancel" icon="pi pi-times" text (click)="hideDialog()" />
                <p-button label="Save" icon="pi pi-check" (click)="saveProduct()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
    `,
    providers: [MessageService, AiService, ConfirmationService]
})
export class Crud implements OnInit {
    ais$: Observable<Ai[]> = this.aiService.ais$;

    productDialog: boolean = false;

    products = signal<Ai[]>([]);

    product!: Ai;

    selectedProducts!: Ai[] | null;

    submitted: boolean = false;

    statuses!: any[];
    sortedAis$!: Observable<Ai[]>;

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];
    aisArray: Ai[] = [];
    constructor(
        private aiService: AiService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.ais$ = this.aiService.ais$.pipe(
            defaultIfEmpty([]) // Emit an empty array if ais$ is null or undefined
          );
          
     }

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadDemoData();
        this.sortedAis$ = this.ais$.pipe(
            map((ais) => [...ais]) // Clone the array to avoid mutation
          );
    }

    loadDemoData() {
        console.log("loading demo data")
        this.aiService.getAllAis()

        this.cols = [
            { field: 'model', header: 'Model', customExportHeader: 'Model' },
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.product = {id:-1,
            key: '', ownerId: 1,
            url: '',
            model: '',
            isActive:false,
            errorMessage:''
        };
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(product: Ai) {
        this.product = { ...product };
        this.productDialog = true;
    }

    // deleteSelectedProducts() {
    //     this.confirmationService.confirm({
    //         message: 'Are you sure you want to delete the selected products?',
    //         header: 'Confirm',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             this.products.set(this.products().filter((val) => !this.selectedProducts?.includes(val)));
    //             this.selectedProducts = null;
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Successful',
    //                 detail: 'Products Deleted',
    //                 life: 3000
    //             });
    //         }
    //     });
    // }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(product: Ai) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.model + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // this.products.set(this.products().filter((val) => val.id !== product.id));
                // console.log("deletinf"+product.id)
                this.aiService.removeAi(product.id);

                // this.product = {id:-1,
                //     key: '', ownerId: 1,
                //     url: '',
                //     model: ''
                // };
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: number): Observable<number> {
        return this.ais$.pipe(
          map(ais => {
            if (!ais) return -1;
            
            for (let i = 0; i < ais.length; i++) {
              if (ais[i].id === id) {
                return i;
              }
            }
            
            return -1;
          })
        );
      }
      
    createId(): number {
        return Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit random number
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

    saveProduct() {
        this.submitted = true;

        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Created',
            life: 3000
        });

        this.aiService.addAi(this.product);

        this.productDialog = false;
        // this.product = {id:-1,
        //     key: '', ownerId: 1,
        //     url: '',
        //     model: ''
        // };

    }
}
