import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceDetectorService {
  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
  private deviceSize$ = new BehaviorSubject<string>(
    this.adjustDeviceSize(window.innerWidth)
  );

  constructor() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onResize(): void {
    this.screenWidth$.next(window.innerWidth);
    this.deviceSize$.next(this.adjustDeviceSize(window.innerWidth));
  }

  private adjustDeviceSize(width: number): string {
    if (width < 576) return 'xs';
    if (width < 768) return 'sm';
    if (width < 992) return 'md';
    if (width < 1200) return 'lg';
    return 'xl';
  }

  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }

  getDeviceSize(): Observable<string> {
    return this.deviceSize$.asObservable();
  }

  getIsSmallDevice(): Observable<boolean> {
    return this.deviceSize$.pipe(
      map((deviceSize) => deviceSize === 'xs' || deviceSize === 'sm')
    );
  }
}
