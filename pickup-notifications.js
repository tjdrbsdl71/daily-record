self.addEventListener('notificationclick', event => {
  event.notification.close();
  const appUrl = new URL('./', self.location.href);
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({type: 'window', includeUncontrolled: true});
    const app = windows.find(client => {
      const url = new URL(client.url);
      return url.origin === appUrl.origin &&
        (url.pathname === appUrl.pathname || url.pathname === appUrl.pathname + 'index.html');
    });
    return app ? app.focus() : self.clients.openWindow(appUrl.href);
  })());
});
