import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { CustomHttpUrlEncodingCodec }                        from './encoder';
import { TokenRequest } from './model/tokenRequest';
import { SignAlg } from './model/SignAlg';
import { BASE_PATH, COLLECTION_FORMATS }                     from './variables';
import { Configuration }                                     from './configuration';


@Injectable({
  providedIn: 'root'
})
export class TokenService {


  //protected basePath = 'https://www.gdoeppert.de/kryptutil';
  protected basePath = 'http://localhost:28080/kryptutil';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
      if (basePath) {
          this.basePath = basePath;
      }
      if (configuration) {
          this.configuration = configuration;
          this.basePath = basePath || configuration.basePath || this.basePath;
      }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
      const form = 'multipart/form-data';
      for (const consume of consumes) {
          if (form === consume) {
              return true;
          }
      }
      return false;
  }


  /**
   * 
   * 
   * @param id 
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public _delete(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public _delete(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public _delete(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public _delete(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      if (id === null || id === undefined) {
          throw new Error('Required parameter id was null or undefined when calling _delete.');
      }

      let headers = this.defaultHeaders;

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
      ];

      return this.httpClient.delete(`${this.basePath}/token/${encodeURIComponent(String(id))}`,
          {
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress,
              responseType: 'text'
          }
      );
  }

  /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
   public create(body: TokenRequest, observe?: 'body', reportProgress?: boolean): Observable<string>;
   public create(body: TokenRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
   public create(body: TokenRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
   public create(body: TokenRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

       if (body === null || body === undefined) {
           throw new Error('Required parameter body was null or undefined when calling create.');
       }

       let headers = this.defaultHeaders;

       // to determine the Accept header
       let httpHeaderAccepts: string[] = [
           '*/*'
       ];
       const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
       if (httpHeaderAcceptSelected != undefined) {
           headers = headers.set('Accept', httpHeaderAcceptSelected);
       }

       // to determine the Content-Type header
       const consumes: string[] = [
           'application/json'
       ];
       const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
       if (httpContentTypeSelected != undefined) {
           headers = headers.set('Content-Type', httpContentTypeSelected);
       }

       return this.httpClient.request('post',`${this.basePath}/token/new`,
           {
               body: body,
               withCredentials: this.configuration.withCredentials,
               headers: headers,
               observe: observe,
               reportProgress: reportProgress,
               responseType: 'text'
           }
       );
   }

 /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
  public listPrivkeys(observe?: 'body', reportProgress?: boolean): Observable<Array<string>>;
  public listPrivkeys(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<string>>>;
  public listPrivkeys(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<string>>>;
  public listPrivkeys(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      let headers = this.defaultHeaders;

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          '*/*'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
      ];

      return this.httpClient.request<Array<string>>('get',`${this.basePath}/token/listprivkeys`,
          {
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }

  /**
   * 
   * 
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listPubkeys(observe?: 'body', reportProgress?: boolean): Observable<Array<string>>;
  public listPubkeys(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<string>>>;
  public listPubkeys(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<string>>>;
  public listPubkeys(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      let headers = this.defaultHeaders;

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          '*/*'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
      ];

      return this.httpClient.request<Array<string>>('get',`${this.basePath}/token/listpubkeys`,
          {
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }

  /**
   * 
   * 
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
   public listAlgs(observe?: 'body', reportProgress?: boolean): Observable<Array<SignAlg>>;
   public listAlgs(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<SignAlg>>>;
   public listAlgs(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<SignAlg>>>;
   public listAlgs(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
       let headers = this.defaultHeaders;
 
       // to determine the Accept header
       let httpHeaderAccepts: string[] = [
           '*/*'
       ];
       const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
       if (httpHeaderAcceptSelected != undefined) {
           headers = headers.set('Accept', httpHeaderAcceptSelected);
       }
 
       // to determine the Content-Type header
       const consumes: string[] = [
       ];
 
       return this.httpClient.request<Array<SignAlg>>('get',`${this.basePath}/token/listalgs`,
           {
               withCredentials: this.configuration.withCredentials,
               headers: headers,
               observe: observe,
               reportProgress: reportProgress
           }
       );
   }
 

    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public decode64(body: string, observe?: 'body', reportProgress?: boolean): Observable<string>;
     public decode64(body: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
     public decode64(body: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
     public decode64(body: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (body === null || body === undefined) {
             throw new Error('Required parameter body was null or undefined when calling decode64.');
         }
 
         let headers = this.defaultHeaders;
 
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             '*/*'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'text/plain'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected != undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         return this.httpClient.request('post',`${this.basePath}/token/decode64`,
             {
                 body: body,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 responseType: 'text',
                 reportProgress: reportProgress
             }
         );
     }
 
     /**
      * 
      * 
      * @param body 
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public encode64(body: string, observe?: 'body', reportProgress?: boolean): Observable<string>;
     public encode64(body: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
     public encode64(body: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
     public encode64(body: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (body === null || body === undefined) {
             throw new Error('Required parameter body was null or undefined when calling encode64.');
         }
 
         let headers = this.defaultHeaders;
 
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             '*/*'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'text/plain'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected != undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         return this.httpClient.request('post',`${this.basePath}/token/encode64`,
             {
                 body: body,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress,
                 responseType: 'text'
             }
         );
     }
 
 /**
     * 
     * 
     * @param jwt 
     * @param key 
     * @param keyalg 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
  public checkJwt(jwt: string, key: string, keyalg: string, observe?: 'body', reportProgress?: boolean): Observable<string>;
  public checkJwt(jwt: string, key: string, keyalg: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
  public checkJwt(jwt: string, key: string, keyalg: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
  public checkJwt(jwt: string, key: string, keyalg: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      if (jwt === null || jwt === undefined) {
          throw new Error('Required parameter jwt was null or undefined when calling checkJwt.');
      }

      if (key === null || key === undefined) {
          throw new Error('Required parameter key was null or undefined when calling checkJwt.');
      }

      if (keyalg === null || keyalg === undefined) {
          throw new Error('Required parameter keyalg was null or undefined when calling checkJwt.');
      }

      let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
      if (jwt !== undefined && jwt !== null) {
          queryParameters = queryParameters.set('jwt', <any>jwt);
      }
      if (key !== undefined && key !== null) {
          queryParameters = queryParameters.set('key', <any>key);
      }
      if (keyalg !== undefined && keyalg !== null) {
          queryParameters = queryParameters.set('keyalg', <any>keyalg);
      }

      let headers = this.defaultHeaders;

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          '*/*'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
      ];

      return this.httpClient.request('get',`${this.basePath}/token/check`,
          {
              params: queryParameters,
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
              //responseType: 'text'
          }
      );
  }

 }
