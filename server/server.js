const express = require('express')
const webpush = require('web-push')
const cors = require('cors')
const bodyParser = require('body-parser')

const PUBLIC_VAPID = 'BDEF5dUYZL6n1_KMDh0cxi3tNjV5w7MI0ed8Tlt6SRCIxGQ3IEQ4DekGXg-RUjJ3aAV9RZy4_zATN0GOGUsbnis'
const PRIVATE_VAPID = 'kX9YlU-Yiw1PsZontxtDnGXxvBuSdaMUNDUVSMOo1jk'

const fakeDatabase = []

const app = express()

app.use(cors())
app.use(bodyParser.json())

webpush.setVapidDetails('mailto:test@gmail.com', PUBLIC_VAPID, PRIVATE_VAPID)

app.post('/subscription', (req, res) => {
  const subscription = req.body
  fakeDatabase.push(subscription)
})

app.post('/sendNotification', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification',
      icon: 'assets/icons/icon-512x512.png',
    },
    actions: [
      {
        action:'navigate',
        title: 'Navigate to Company Dashboard'
      }
    ]
  }

  const promises = []
  fakeDatabase.forEach(subscription => {
    promises.push(
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload)
      )
    )
  })
  Promise.all(promises).then(() => res.sendStatus(200))
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
