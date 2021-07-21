import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { SearchParams } from 'src/app/shared/abstract/master-grid/table.model';
import { MemberProfileRendererComponent } from 'src/app/shared/cell-renderers/member-profile/member-profile-renderer.component';
import { USER_ROLES_NAMES } from 'src/app/shared/common/constants';
import { FetchParams, resources, User } from 'src/app/shared/common/models';
import {
  FetchMembersAction,
  ForceRefetchMembersAction,
} from 'src/app/shared/state/members/member.actions';
import { memberColumns } from 'src/app/shared/state/members/member.model';
import { MemberState } from 'src/app/shared/state/members/member.state';
import { MemberProfileComponent } from '../../modals/member-profile/member-profile.component';
import { LEARNERS_LABEL } from '../../static/dashboard/tabs/admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-learners-table',
  templateUrl: './learners-table.component.html',
  styleUrls: ['./learners-table.component.scss'],
})
export class LearnersTableComponent implements OnInit {
  tableTitle: string = LEARNERS_LABEL;
  resource: string = resources.LEARNERS;
  members: object[];
  @Select(MemberState.listMembers)
  rows$: Observable<User[]>;
  @Select(MemberState.isFetching)
  isFetching$: Observable<boolean>;
  @Select(MemberState.errorFetching)
  errorFetching$: Observable<boolean>;
  @Select(MemberState.fetchParams)
  fetchParams$: Observable<FetchParams>;

  columnFilters = {
    roleName: USER_ROLES_NAMES.LEARNER,
  };
  defaultColDef = {
    resizable: true,
  };
  columns = memberColumns;
  frameworkComponents = {
    memberRenderer: MemberProfileRendererComponent,
  };
  gridOptions: GridOptions;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
  }

  fetchMembers(searchParams: SearchParams) {
    this.store.dispatch(
      new FetchMembersAction({
        searchParams: { ...searchParams, newColumnFilters: this.columnFilters },
      })
    );
  }

  forceRefetchMembers(searchParams: SearchParams) {
    this.store.dispatch(
      new ForceRefetchMembersAction({
        searchParams: { ...searchParams, newColumnFilters: this.columnFilters },
      })
    );
  }

  openMemberProfile(rowData) {
    const dialogRef = this.dialog.open(MemberProfileComponent, {
      data: rowData,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngOnInit(): void {}
}
