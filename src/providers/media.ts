import { Injectable, EventEmitter } from '@angular/core';

export const MEDIA:any = {
  'xs'        : '(max-width: 599px)'                         ,
  'gt-xs'     : '(min-width: 600px)'                         ,
  'sm'        : '(min-width: 600px) and (max-width: 959px)'  ,
  'gt-sm'     : '(min-width: 960px)'                         ,
  'md'        : '(min-width: 960px) and (max-width: 1279px)' ,
  'gt-md'     : '(min-width: 1280px)'                        ,
  'lg'        : '(min-width: 1280px) and (max-width: 1919px)',
  'gt-lg'     : '(min-width: 1920px)'                        ,
  'xl'        : '(min-width: 1920px)'                        ,
  'landscape' : '(orientation: landscape)'                   ,
  'portrait'  : '(orientation: portrait)'                    ,
  'print' : 'print'
};

export const MEDIA_PRIORITY: any = [
  'xl',
  'gt-lg',
  'lg',
  'gt-md',
  'md',
  'gt-sm',
  'sm',
  'gt-xs',
  'xs',
  'landscape',
  'portrait',
  'print'
];

export declare interface MediaChange {
  query:string;
  active:boolean;
}

export class MediaWatcher extends EventEmitter<boolean> {

  private media:MediaQueryList;
  private query:string;

  constructor(query:string) {
    
    super();
    
    this.query = query;

    if (!MEDIA[query]) {
      throw new Error(`Media query '${query}' not found`);
    }

    this.media = window.matchMedia(MEDIA[query]);
    this.media.addListener(this.onQueryChange.bind(this));
  }

  isActive() {
    return !!this.media.matches;
  }

  private onQueryChange(query) {
    this.next({
      query: this.query,
      active: !!query.matches,
    });
  }

  complete(): void {
    super.complete();
    this.media.removeListener(this.onQueryChange.bind(this));
  }
}

@Injectable()
export class Media {

  private queries:any = {};
  private results:any = {};
  private mqls:any = {};

  query(q:string):boolean {
    
    var validated = this.queries[q];

    if (validated === undefined) {
      validated = this.queries[q] = this.validate(q);
    }

    var result = this.results[validated];
    if (result === undefined) {
      result = this.add(validated);
    }

    return result;
  }

  watch(query:string):MediaWatcher {
    return new MediaWatcher(query);
  }

  private add(query) {
    
    var result = this.mqls[query];
    
    if ( !result ) {
      result = this.mqls[query] = window.matchMedia(query);
    }

    result.addListener(this.onQueryChange.bind(this));
    return (this.results[result.media] = !!result.matches);
  }

  private onQueryChange(query) {
    this.results[query.media] = !!query.matches;
  }

  private validate(query) {
    return MEDIA[query] || ((query.charAt(0) !== '(') ? ('(' + query + ')') : query);
  }
}