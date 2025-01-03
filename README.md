# My Notes

A simple, secure note-taking application built with React, Firebase, and Google Analytics. Users can create, edit, and manage their notes with a clean and intuitive interface.

## Features

- **User Authentication**
  - Email/Password registration and login
  - Google Sign-in integration
  - Secure session management
  - Protected routes

- **Note Management**
  - Create and save notes
  - Edit existing notes
  - Delete unwanted notes
  - Real-time updates

- **Security**
  - Firebase Authentication
  - Firestore security rules
  - Protected API endpoints
  - User data isolation

- **Analytics**
  - Page view tracking
  - User engagement metrics
  - Feature usage analytics
  - Event categorization

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Firebase
  - Authentication
  - Firestore
- Google Analytics
- Vite
- React Router DOM
- Lucide React (icons)

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── auth/         # Authentication-related components
│   └── notes/        # Note management components
├── contexts/         # React contexts
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── providers/       # Context providers
├── services/        # Firebase service integrations
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Firebase Setup

1. Create a new Firebase project
2. Enable Authentication with Email/Password and Google providers
3. Create a Firestore database
4. Deploy Firestore security rules from `firestore.rules`
5. Add your web app to get configuration credentials

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Security

- Authentication state is managed securely through Firebase
- Firestore rules ensure users can only access their own data
- All database operations are protected with proper authorization checks

## Analytics Implementation

The application uses Google Analytics 4 for tracking:

- Page views
- User authentication events
- Note creation/editing/deletion
- User engagement metrics

Events are categorized as:
- User events (sign up, login, logout)
- Note events (create, edit, delete)
- Page events (navigation)

## Best Practices

- Component-based architecture
- Custom hooks for reusable logic
- TypeScript for type safety
- Proper error handling
- Responsive design
- Clean and maintainable code structure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - feel free to use this project for your own learning or as a starting point for your applications.