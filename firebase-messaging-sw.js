// Firebase Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyAJFU8xVwwTODvF53rYQm7QAuzFWsJu5AM",
  authDomain: "ajayfreelancer-31eb4.firebaseapp.com",
  projectId: "ajayfreelancer-31eb4",
  storageBucket: "ajayfreelancer-31eb4.firebasestorage.app",
  messagingSenderId: "351192431048",
  appId: "1:351192431048:web:53eae89fa3012dbb9be8fd"
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
    badge: '/logo192.png',
    tag: 'job-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'View Job'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    // Open the app when user clicks "View Job"
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});