import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/common/models';
import { parseDateTime } from 'src/app/shared/common/functions';
import { emptyMemberFormRecord } from 'src/app/modules/dashboard/modules/admin/modules/member/state/member.model';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-profile-projects.component.html',
  styleUrls: [
    './user-profile-projects.component.scss',
    './../../../../../../../shared/common/shared-styles.css',
  ],
})
export class UserProjectsComponent {
  @Input() member: User = emptyMemberFormRecord;
  @Input() ownProfile: boolean = false;
  projects: any = [];
  constructor() {
    this.projects = this.member?.projects ? this.member?.projects : [];
  }

  createProject() {}

  ngOnChanges(changes) {
    if (changes.member) {
      this.projects = this.member?.projects ? this.member?.projects : [];
    }
  }

  parseDate(date) {
    return parseDateTime(date);
  }
}
