// Google Analytics Event Names
export enum AnalyticsEvent {
  PAGE_VIEW = 'page_view',
  SIGN_UP = 'sign_up',
  LOGIN = 'login',
  LOGOUT = 'logout',
  NOTE_CREATE = 'note_create',
  NOTE_EDIT = 'note_edit',
  NOTE_DELETE = 'note_delete'
}

// Event Categories
export enum EventCategory {
  USER = 'User',
  NOTE = 'Note',
  PAGE = 'Page'
}

// Initialize Google Analytics
export const initializeAnalytics = async () => {
  // Load GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=G-4N6TQNGSJG`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', 'G-4N6TQNGSJG', {
    send_page_view: false, // Disable automatic page views
    cookie_flags: 'SameSite=None;Secure' // Enhanced security
  });
};

// Track page views
export const trackPageView = (path: string) => {
  if (!window.gtag) return;
  
  window.gtag('event', AnalyticsEvent.PAGE_VIEW, {
    page_path: path,
    event_category: EventCategory.PAGE
  });
};

// Track user events
export const trackUserEvent = (
  action: AnalyticsEvent,
  additionalParams?: Record<string, any>
) => {
  if (!window.gtag) return;

  window.gtag('event', action, {
    event_category: EventCategory.USER,
    ...additionalParams
  });
};

// Track note events
export const trackNoteEvent = (
  action: AnalyticsEvent,
  additionalParams?: Record<string, any>
) => {
  if (!window.gtag) return;

  window.gtag('event', action, {
    event_category: EventCategory.NOTE,
    ...additionalParams
  });
};