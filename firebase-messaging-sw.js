// firebase-messaging-sw.js
// This file MUST be named exactly "firebase-messaging-sw.js"
// and placed in the root folder alongside index.html

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyDpX0oR-7EeXht0kk1Wdu-cqmB6OM4e40c",
  authDomain:        "wali-7847f.firebaseapp.com",
  projectId:         "wali-7847f",
  storageBucket:     "wali-7847f.firebasestorage.app",
  messagingSenderId: "352768967123",
  appId:             "1:352768967123:web:81156c470ad2ac00f7ef26",
});

const messaging = firebase.messaging();

// Handle background messages (when app is closed or in background)
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  const { title, body, icon } = payload.notification || {};

  const notificationOptions = {
    body:    body  || 'You have a new update on NAVIX',
    icon:    icon  || '/icon-192.png',
    badge:   '/icon-192.png',
    vibrate: [200, 100, 200],
    data:    payload.data || {},
    actions: [
      { action: 'open',    title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss'  },
    ],
  };

  return self.registration.showNotification(
    title || '🧭 NAVIX',
    notificationOptions
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  // Open the app
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('navix') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('https://navix-tau.vercel.app');
    })
  );
});
