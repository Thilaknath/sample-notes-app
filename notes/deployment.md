# Firebase Deployment Guide

## Setup

1. **Install Firebase locally**
   ```bash
   npm i firebase-tools -D
   ```

2. **Login to Firebase**
   ```bash
   node_modules/.bin/firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   node_modules/.bin/firebase init hosting
   ```
   - **Public directory**: `dist`
   - **Single-page app**: Yes
   - **Automatic builds and deploys with GitHub**: `node_modules`

4. **Initialize Emulators**
   ```bash
   node_modules/.bin/firebase init emulators
   ```

## Emulators Setup

- **Select Emulators**: Hosting Emulator
- **Hosting Emulator Port**: 5033
- **Enable Emulator UI**: Yes
- **Emulator UI Port**: (leave empty for any available port)
- **Download Emulators**: Yes

## Configuration

5. **Modify `firebase.json` with the following config:**

   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     },
     "emulators": {
       "auth": {
         "port": 9099
       },
       "firestore": {
         "port": 8080
       },
       "hosting": {
         "port": 5033
       },
       "ui": {
         "enabled": true,
         "port": 4000
       },
       "singleProjectMode": true
     }
   }
   ```

6. **Start Emulators**
   ```bash
   node_modules/.bin/firebase emulators:start
   ```

7. **Deploy to Firebase**
   ```bash
   node_modules/.bin/firebase deploy --only hosting
   ```

8. **Configuration Files**
   - `.firebaserc`: Project configuration
   - `firebase.json`: Server configuration, custom redirects

## Deploy to Preview Channel

1. **Deploy to Preview Channel**
   ```bash
   node_modules/.bin/firebase hosting:channel:deploy test --expires 1h
   ```

2. **Delete a Channel**
   ```bash
   node_modules/.bin/firebase hosting:channel:delete test
   ```

## Setup GitHub Actions for CI/CD

1. **Initialize GitHub Actions**
   ```bash
   node_modules/.bin/firebase init hosting:github
   ```
   - **GitHub repository**: `<YOUR REPOSITORY NAME>`
   - **Run build script before deploy**: Yes
   - **Build script**: `npm ci && npm run build`
   - **Automatic deployment on PR merge**: Yes
   - **Live channel branch**: `main`

2. **Copy Firebase Configs as Secrets in GitHub Repository**

3. **Create a New Commit and Push Changes**

4. **Commit `package-lock.json` as well**
