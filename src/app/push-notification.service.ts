import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  readonly SERVER_URL = 'http://localhost:3000/subscription';

  constructor(
    private http: HttpClient
  ) { }

  sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(this.SERVER_URL, subscription);
  }

  sendNotification() {
    return this.http.post('http://localhost:3000/sendNotification', '');
  }
}
