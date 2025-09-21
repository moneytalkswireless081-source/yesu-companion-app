# YesuApp - Christian Faith PWA

A comprehensive Progressive Web Application built for Christian fellowship, daily spiritual growth, and community connection.

## 🌟 Features

### Core Functionality
- **Daily Scripture**: Device-seeded daily verses with commentary and guided prayer
- **Bible Study Plans**: Interactive study plans with progress tracking
- **Community**: Prayer requests, testimonies, Q&A, and discussions
- **Events Calendar**: Church events with RSVP and reminders
- **Notifications**: Daily scripture alerts and community updates
- **Share Feature**: Web Share API with fallback copy-to-clipboard
- **Offline Support**: Dexie.js for local data persistence

### Technical Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand + React Query
- **Database**: IndexedDB via Dexie.js
- **Mobile**: Capacitor for Android/iOS wrapping
- **PWA**: Service Worker with Workbox (planned)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd yesuapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 📱 Capacitor Mobile Development

### Initial Setup
```bash
# Initialize Capacitor (already done)
npx cap init

# Add platforms
npx cap add android
npx cap add ios
```

### Development Workflow
1. Build the web app:
```bash
npm run build
```

2. Sync with native platforms:
```bash
npx cap sync
```

3. Run on device/emulator:
```bash
# Android
npx cap run android

# iOS (requires Xcode on macOS)
npx cap run ios
```

### Building APK/AAB

#### Prerequisites
- Android Studio installed
- Java Development Kit (JDK) 11+
- Android SDK configured

#### Steps
1. Open the Android project:
```bash
npx cap open android
```

2. In Android Studio:
   - Build → Generate Signed Bundle/APK
   - Choose "Android App Bundle" for Play Store
   - Choose "APK" for direct installation

#### For Release Build
1. Create a keystore file:
```bash
keytool -genkey -v -keystore yesuapp-release.keystore -alias yesuapp -keyalg RSA -keysize 2048 -validity 10000
```

2. Configure in `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            keyAlias 'yesuapp'
            keyPassword 'your-key-password'
            storeFile file('../yesuapp-release.keystore')
            storePassword 'your-store-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Development
VITE_APP_ENV=development

# Firebase Configuration (when implemented)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

# Bible API (example)
VITE_BIBLE_API_KEY=your-bible-api-key

# Stripe (for donations)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-key
```

## 🧪 Quality Assurance Checklist

### Functional Testing
- [ ] Daily scripture loads and displays correctly
- [ ] Navigation between tabs works smoothly
- [ ] Share functionality works (Web Share API + fallback)
- [ ] Bookmarks save and load properly
- [ ] Notifications can be toggled on/off
- [ ] Settings persist across app restarts
- [ ] Offline mode caches content
- [ ] Community posts display and interactions work
- [ ] Event RSVP and reminders function
- [ ] All buttons and links are functional

### Mobile Testing
- [ ] App installs correctly via Capacitor
- [ ] Push notifications work on Android/iOS
- [ ] Share functionality works on mobile
- [ ] Touch interactions are responsive
- [ ] App works in portrait and landscape
- [ ] Offline functionality works without internet

### Performance Testing
- [ ] App loads within 3 seconds
- [ ] Smooth scrolling and animations
- [ ] Database operations are fast
- [ ] Images load efficiently
- [ ] No memory leaks during navigation

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## 🛠️ Development Guidelines

### Code Style
- Use TypeScript for all components
- Follow React functional component patterns
- Use Tailwind's design system tokens
- Implement proper error handling
- Add loading states for async operations

### State Management
- Use Zustand for global app state
- Use React Query for server state
- Persist important data with Dexie.js
- Handle offline/online state properly

### Component Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── daily/        # Daily scripture components
│   ├── community/    # Community feature components
│   └── ...
├── pages/            # Main page components
├── stores/           # Zustand stores
├── lib/              # Utilities and database
└── hooks/            # Custom React hooks
```

## 📋 Planned Features

### Phase 2
- [ ] Firebase backend integration
- [ ] Real-time community features
- [ ] Push notifications via FCM
- [ ] User authentication
- [ ] Marriage resources section
- [ ] Counseling directory
- [ ] Donation system integration

### Phase 3
- [ ] Advanced Bible search
- [ ] Audio scripture playback
- [ ] Prayer journal
- [ ] Group Bible studies
- [ ] Event live streaming
- [ ] Multi-language support

## 👨‍💻 Developer

**Kisekka Henry**
- Email: zoekisekka@gmail.com
- Phone: +256 701 709 077

## 📄 License

This project is built for the glory of God and the advancement of His Kingdom.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

---

Built with ❤️ for the Kingdom of God