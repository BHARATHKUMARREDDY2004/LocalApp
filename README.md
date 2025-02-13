# Lokal App
[▶ Watch Here](https://drive.google.com/file/d/1AXSKNvSpYDpV9FQJMpiiCgx8MShBt9UZ/view?usp=drivesdk)

This is a React Native application built with Expo, Tailwind CSS, and Zustand for state management. The app allows users to browse job listings, bookmark jobs, and view saved jobs offline.

## 🚀 Features

- **Bottom Navigation**: Two sections - Jobs and Bookmarks.
- **Infinite Scroll**: Fetches job data from the API dynamically.
- **Job Details Screen**: Displays job title, location, salary, contact details and other information.
- **Bookmarking**: Allows users to save jobs for offline viewing.
- **State Management**: Uses Zustand to handle global states.
- **Offline Storage**: Saves bookmarked jobs for later access.
- **Error & Loading States**: Provides feedback for different app states.

## 🛠️ Tech Stack

- **React Native** (with Expo)
- **Tailwind CSS** (for styling)
- **Zustand** (for state management)
- **AsyncStorage** (for offline bookmarks)

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/react-native-jobs-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd react-native-jobs-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npx expo start
   ```

## 🔗 API Used

- The app fetches job data from:
  ```
  https://testapi.getlokalapp.com/common/jobs?page=1
  ```

## 📜 Usage

- Open the app to see job listings.
- Tap on a job card to view more details.
- Bookmark jobs to save them for offline access.
- Switch to the **Bookmarks** tab to see saved jobs.
