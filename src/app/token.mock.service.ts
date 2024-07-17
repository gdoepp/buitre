
import { Injectable }         from '@angular/core';
import { Observable, of }     from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenServiceMock {

    constructor() {
    }


    public checkJwt(jwt: string, key: string, keysrc: string): Observable<any> {
        return of({});
    }

    public create(tokenRequest: any, observe?: 'body'): Observable<any> {
        return of({});
    }

    public listAlgs(): Observable<Array<any>> {

        return of(['a', 'b']);
    }
    public listPrivkeys(): Observable<Array<any>> {

        return of(['a', 'b']);
    }
    public listPubkeys(): Observable<Array<any>> {

        return of(['a', 'b']);
    }


}
