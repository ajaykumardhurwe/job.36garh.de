// Firebase Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

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
  
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new notification',
    icon: '/logo192.png',
    badge: '/logo192.png',
    tag: 'job-notification',
    requireInteraction: true,
    data: payload.data,
    actions: [
      {
        action: 'view',
        title: 'View'
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
  console.log('Notification click received.');
  
  event.notification.close();
  
  if (event.action === 'view') {
    // Open the app when user clicks "View"
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle push events
self.addEventListener('push', (event) => {
  console.log('Push event received:', event);
  
  if (event.data) {
    const data = event.data.json();
    console.log('Push data:', data);
    
    const notificationTitle = data.notification?.title || 'JobPortal';
    const notificationOptions = {
      body: data.notification?.body || 'New update available',
      icon: '/logo192.png',
      badge: '/logo192.png',
      tag: 'job-portal-notification',
      data: data.data
    };
    
    event.waitUntil(
      self.registration.showNotification(notificationTitle, notificationOptions)
    );
  }
});