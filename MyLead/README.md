# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

## Google Maps Setup (Expo SDK)
### Why this setup is needed
- **iOS**: Google Maps works directly in Expo Go — no extra setup required.
- **Android**: Expo Go does **not** include the Google Maps SDK. You must create a **custom development client** with your Google Maps API key to make Maps work.

### 1. Prerequisites
- Node.js and npm installed
- Expo CLI installed (`npm install -g expo-cli`)
- EAS CLI available (`npm install -g eas-cli` or use `npx eas-cli`)
- An Expo account (sign up at [expo.dev](https://expo.dev))

### 2. Configure Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create or use an existing project.
3. Enable **Maps SDK for Android**.
4. Generate an **API Key**.
5. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
6. Open **.env** and add your Google Maps API key:
```bash
GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
```
7. The key is automatically loaded in app.config.js like this:
```bash
import 'dotenv/config';

export default {
  expo: {
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
      }
    }
  }
};
```
### 3. Setup EAS Build Config (eas.json)
Create an **eas.json** file in your project root (if it doesn’t exist):
```bash
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "distribution": "store"
    }
  }
}
```
This tells Expo how to build a custom dev client for Android.

### 4. Running the App
### iOS
#### 1. Start the development server:
```bash
npm start
```
#### 2. Scan the QR code with Expo Go on your iOS device.
Maps will load normally.

### Android
#### 1. Build and install a custom development client (first time only, or whenever you change native dependencies):
```bash
npx eas-cli build --platform android --profile development
```
* Log in with your Expo account when prompted.
* Download the generated APK from Expo’s website and install it on your device.

#### 2. Start the development server:
```bash
npm start
```
This will show a QR code in your terminal or Expo Dev Tools.
#### 3. Open the project with your custom development client
* On your Android device, open the **custom dev client** app you installed.
* Use it to scan the QR code from the Metro bundler.
* Maps will now load properly.

**Note:** Scanning the QR code with **Expo Go** on Android will not work for Google Maps, since Expo Go does not include the Maps SDK. Always use the custom dev client instead.

### 5. Notes
* On **iOS**, Expo Go works directly.
* On **Android**, you must use your custom dev client (not Expo Go).
* You only need to rebuild the custom client if you change native dependencies (e.g., adding another SDK).
* If Maps still shows a blank screen:
   * Ensure your API key is set in **.env**.
   * Verify billing is enabled in Google Cloud Console.
   * Confirm the **Maps SDK for Android** is enabled.