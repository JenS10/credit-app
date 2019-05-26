import { Component, OnInit, Input, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { IClientCredit } from '../../../../core/interfaces/client/client';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() data: IClientCredit[];

  @Output() eventPay: EventEmitter<IClientCredit>;
  @Output() eventGoToCreditInfo: EventEmitter<IClientCredit>;

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<IClientCredit>;

  constructor() {
    this.displayedColumns = [
      'client',
      'identification',
      'credit',
      'date_application',
      'status',
      'paid',
      'paymenth_day',
      'operations',
    ];
    this.dataSource = new MatTableDataSource([]);
    this.eventPay = new EventEmitter<IClientCredit>();
    this.eventGoToCreditInfo = new EventEmitter<IClientCredit>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
