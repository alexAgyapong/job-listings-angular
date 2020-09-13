import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isTablet: boolean;

  constructor( private breakPointObserver: BreakpointObserver) { }

  isTabletBreakPoint(): boolean {
   return this.breakPointObserver.isMatched('(min-width:768px)');
  }
}
