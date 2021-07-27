import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ShowNotificationAction } from '../state/notifications/notification.actions';
import { AuthState } from '../state/auth/auth.state';
import { AuthStateModel } from '../state/auth/auth.model';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from './authorization/authorization.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  @Select(AuthState)
  authState$: Observable<AuthStateModel>;
  authState: AuthStateModel;
  activeMember: boolean = false;
  isFullyAuthenticated: boolean = false;
  isLoggedIn: boolean = false;
  constructor(
    private _router: Router,
    private store: Store,
    private auth: AuthorizationService
  ) {
    this.authState$.subscribe((val) => {
      this.authState = val;
      // this.membershipStatus = this.authState.membershipStatus;
      this.isFullyAuthenticated = this.authState.isFullyAuthenticated;
      this.isLoggedIn = this.authState.isLoggedIn;
      // this.activeMember = this.membershipStatus == MembershipStatus.ACTIVE;
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const routePermissions = next.data;
    const resource = routePermissions?.resource;
    const actions = routePermissions?.actions;
    console.log('from canActivate ', {
      route: next,
      routePermissions,
      resource,
      actions,
    });
    if (this.isLoggedIn && !this.isFullyAuthenticated) {
      return false;
    } else {
      if (resource) {
        let result = false;
        for (let i = 0; i < actions.length; i++) {
          const action = actions[i];
          // if resource permissions exists for this route, it will check with authorization service and return it's output
          console.log(
            'canActivate checking auth guard for ',
            {
              resource,
              action,
            },
            'this.auth.authorizeResource(resource, action, {});',
            (result =
              result || this.auth.authorizeResource(resource, action, {}))
          );
          result = result || this.auth.authorizeResource(resource, action, {});
        }
        return result;
      }
      // if resource is null, then it is automatically returned true without checking with authorization service
      return true;
    }
    // if (this.isFullyAuthenticated) {
    //   return true;
    // } else {
    //   this._router.navigateByUrl('');
    //   // this.store.dispatch(
    //   //   new ShowNotificationAction({
    //   //     message: 'You are not authorized to access that page!',
    //   //     action: 'error',
    //   //   })
    //   // );
    //   return false;
    // }

    // return Auth.currentAuthenticatedUser()
    //   .then(() => {
    //     console.log('from authentication guard ', {
    //       activeMember: this.activeMember,
    //     });
    //     if (!this.isFullyAuthenticated || this.activeMember == true) {
    //       /** If the app is still yet to complete fetching authentication information
    //        * or if the user is an active member, let them through.
    //        * The app will anyway show the routerOutlet only after the authentication info is fully fetched.
    //        */
    //       return true;
    //     } else throw false;
    //   })
    //   .catch(() => {
    //     this._router.navigateByUrl('');
    //     this.store.dispatch(
    //       new ShowNotificationAction({
    //         message: 'You are not authorized to access that page!',
    //       })
    //     );
    //     return false;
    //   });
  }
}

@Injectable()
export class RegistrationFormAuthGuard implements CanActivate {
  @Select(AuthState)
  authState$: Observable<AuthStateModel>;
  authState: AuthStateModel;
  isLoggedIn: boolean;
  firstTimeSetup: boolean;
  isFullyAuthenticated: boolean;
  constructor(private _router: Router, private store: Store) {
    this.authState$.subscribe((val) => {
      this.authState = val;
      this.isLoggedIn = this.authState?.isLoggedIn;
      this.firstTimeSetup = this.authState?.firstTimeSetup;
      this.isFullyAuthenticated = this.authState?.isFullyAuthenticated;
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
    // if ((this.isLoggedIn && this.firstTimeSetup) || this.isFullyAuthenticated) {
    //   return true;
    // } else {
    //   this._router.navigateByUrl('');
    //   // this.store.dispatch(
    //   //   new ShowNotificationAction({
    //   //     message: 'You are not authorized to access that page!',
    //   //     action: 'error',
    //   //   })
    //   // );
    //   return false;
    // }
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  @Select(AuthState)
  authState$: Observable<AuthStateModel>;
  authState: AuthStateModel;
  token: string;
  constructor() {
    this.authState$.subscribe((val) => {
      this.authState = val;
      this.token = this.authState.token;
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // add JWT auth header if a user is logged in for API requests
    const isApiUrl = request.url.startsWith(environment.graphql_endpoint);
    console.log('from authInterceptor ', { isApiUrl, token: this.token });
    if (this.token && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `JWT ${this.token}` },
      });
      console.log('After setting authorization header ', request);
    }

    return next.handle(request);
  }
}
