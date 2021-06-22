import { defaultPageSize } from '../abstract/master-grid/table.model';

/* 
This is an object that requires an id of type string
to be used in NGXS actions
*/
export type idPayload = {
  id: number;
};

/*
Fetch policy to be used when making Graphql queries via AWS Amplify Client
*/
export type FetchPolicy =
  | 'cache-first'
  | 'cache-and-network'
  | 'network-only'
  | 'cache-only'
  | 'no-cache'
  | 'standby';

export type HotToastPositionOptions =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type HotToastStatus =
  | 'show'
  | 'success'
  | 'warning'
  | 'error'
  | 'loading';

export type MatSelectOption = { label: string; value: number | string };

export type Chat = {
  id: number;
  name: string;
  admins: any[];
  members: any[];
  chatmessageSet: ChatMessage[];
};

export type ChatMessage = {
  id: number;
  message: string;
  author: {
    id: number;
    firstName: string;
    avatar: string;
  };
  createdAt: string;
};

export type PaginationObject = {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  offset: number; // the number of records in all pages prior to current page combined
};

export const startingPaginationObject: PaginationObject = {
  currentPage: 1,
  totalCount: defaultPageSize,
  pageSize: defaultPageSize,
  offset: 0,
};

export type CurrentMember = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  invitecode?: string;
  institution?: { id: number; name: string };
  membershipStatus: string;
};

export const SUBSCRIPTION_METHODS = {
  CREATE_METHOD: 'CREATE',
  UPDATE_METHOD: 'UPDATE',
  DELETE_METHOD: 'DELETE',
};

export const MembershipStatus = {
  UNINITIALIZED: 'UI',
  PENDING: 'PE',
  APPROVED: 'AP',
  SUSPENDED: 'SU',
};

export type User = {
  id?: number;
  username?: string;
  firstName: string;
  lastName: string;
  email?: string;
  avatar?: string;
  institution?: any;
  invitecode?: string;
  title?: string;
  bio?: string;
};

export const CREATE = 'CREATE';
export const LIST = 'LIST';
export const VIEW = 'VIEW';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';

export type UserRole = {
  id?: number;
  name: string;
  description: string;
  resourcePermissions: object;
};

export type Announcement = {
  id: number;
  title: string;
  author: User;
  message: string;
  institution: Institution;
  groups: Group[];
};

export type Group = {
  id: number;
  name: string;
  description: string;
  institution: {
    id: number;
  };
  members: number[];
  admins: number[];
  groupType: string;
};

export const GroupType = {
  class: 'CL',
  team: 'TE',
  coordination: 'CO',
};

export type Institution = {
  id: number;
  name: string;
  location?: string;
  city?: string;
  website?: string;
  phone?: string;
  logo?: string;
  bio?: string;
  invitecode?: string;
};

export type Course = {
  id: number;
  title: string;
  description: String;
  instructor: User;
  institutions: Institution[];
};

export type Assignment = {
  id: number;
  title: string;
  instructions: string;
  course: Course;
};
