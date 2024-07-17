
import { Injectable }         from '@angular/core';
import { Observable, of }     from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PgpServiceMock {

    constructor() {
    }


    public encryptAsym(key: string, body: string): Observable<string> {
        return of (body);
    }
    public decryptAsym(key: string, body: string): Observable<string> {
        return of (body);
    }

    public listAlgs(): Observable<Array<any>> {

        return of(['a', 'b']);
    }
    public listPrivKeys(): Observable<Array<any>> {

        return of(['a', 'b']);
    }
    public listPubKeys(): Observable<Array<any>> {

        return of(['a', 'b']);
    }


}
