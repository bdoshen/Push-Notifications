import { PushNotificationService } from './push-notification.service';
import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly VAPID_PUBLIC_KEY = 'BDEF5dUYZL6n1_KMDh0cxi3tNjV5w7MI0ed8Tlt6SRCIxGQ3IEQ4DekGXg-RUjJ3aAV9RZy4_zATN0GOGUsbnis';

  constructor(
    private swPush: SwPush,
    private pushService: PushNotificationService
  ) {
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY,
        })
        .then(subscription => {
          pushService.sendSubscriptionToTheServer(subscription).subscribe();
        })
        .catch(console.error);
    }
  }

  sendNotification() {
    console.log('Attempting to send notification');

    if (this.swPush.isEnabled) {
      console.log('Made it through if statement');
      this.pushService.sendNotification().subscribe(() => {}, error => {
        console.log(error);
      });
    }
  }
}
