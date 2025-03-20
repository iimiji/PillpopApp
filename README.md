# Pillpop – Smart Medication Management App

## 📌 Project Overview
Pillpop is a **mobile application designed to help users manage their daily medication intake efficiently**. It integrates **real-time tracking, personalized reminders, and an intuitive UI** to improve medication adherence. This project was entirely conceptualized, designed, and developed by **Miji Kim**, covering **research, UI/UX design, full-stack development, and deployment**.

---

## 🚀 Features

### 🔑 User Authentication
- Firebase Authentication is used to enable **secure email/password-based login and sign-up**.
- User sessions are managed to provide a personalized experience.

### 💊 Medication Tracking
- Users can **add, edit, and delete their daily medications**.
- A **progress tracker** visually represents the number of medications taken.
- Completing all medications triggers **audio feedback and animated visual reinforcement**.

### ⏰ Smart Reminders
- Customizable **alarm notifications** help users stay on schedule.
- Integrated with **Expo-av** for sound alerts when it’s time for medication.
- Engaging animations provide visual confirmation when medications are taken.

### 📍 Pharmacy Finder (Google Maps API Integration)
- Users can **search for nearby pharmacies** based on real-time location tracking.
- Displays essential information such as **distance, address, and operating hours**.

### 🔎 Medication Information Retrieval (FDA API Integration)
- Users can **search for medications** and retrieve official **drug information from the FDA API**.
- Allows saving frequently used medications for easy access.

### 📸 Medication Image Storage
- Instead of using Firebase Storage, the app leverages **AsyncStorage** for local image storage.
- Users can **capture photos using their camera or upload from the gallery**.

### 🎯 Animated Progress & Engagement
- Utilizes **React Native Animated API** to visually represent a user’s medication adherence.
- Implemented **gamification elements** to motivate users to complete their daily medication intake.

### 📰 Latest Medical News Feed
- Integrated **NewsAPI** to display the latest health-related articles within the app.
- A filtering system ensures **high-quality and relevant news content** is presented to the user.

---

## 📌 Target Users
This app is ideal for:
- **Elderly individuals** who need a simple and clear medication management system.
- **Busy professionals** who require automated reminders.
- **Chronic patients** who rely on scheduled medication adherence.

User testing has shown that **a minimalistic UI and simplified interactions** are crucial for usability and adoption.

---

## 🔨 Tech Stack
### **Frontend:**
- **React Native** (for cross-platform development)
- **Expo** (for streamlined app deployment)

### **Backend & Database:**
- **Firebase Firestore** (for real-time medication tracking and authentication)

### **APIs & Third-Party Integrations:**
- **Google Maps API** (for pharmacy search)
- **FDA API** (for medication information retrieval)
- **Expo-av** (for sound notifications and alerts)
- **AsyncStorage** (for local storage of medication images)
- **NewsAPI** (for fetching health-related news articles)

---

## 📈 Development Process

### 1️⃣ Research & Ideation
- Conducted **market research** on existing medication management solutions.
- Analyzed **user pain points** through surveys and case studies.
- Defined key differentiating features for Pillpop.

### 2️⃣ UI/UX Design
- Created **low-fidelity wireframes** to structure the user flow.
- Developed **high-fidelity UI prototypes** using **Figma**, focusing on accessibility and simplicity.

### 3️⃣ Full-Stack Development
- **Frontend:** Built using **React Native** for **cross-platform support (iOS & Android)**.
- **Backend:** Firebase Firestore was utilized to **handle real-time medication tracking and user authentication**.
- **Third-Party API Integrations:**
  - Google Maps API for pharmacy search.
  - FDA API for medication information retrieval.
  - Expo-av for sound-based notifications.
  - AsyncStorage for local image storage.

### 4️⃣ User Testing & Refinements
- Conducted usability testing to identify **pain points and usability issues**.
- Iteratively improved the UI based on **real-world user feedback**.
- Fine-tuned **alarm system, UI responsiveness, and navigation structure**.

---

## ⚠️ Challenges & Solutions

| **Challenges** | **Solutions Implemented** |
|--------------|--------------------|
| **Firebase Storage costs for images** | Shifted to **local storage (AsyncStorage)** to minimize recurring expenses. |
| **Delayed medication search results from API** | Implemented **API response caching** for faster load times. |
| **Limited user engagement in medication tracking** | Added **visual progress animations & sound-based feedback** to increase motivation. |
| **Background notifications not triggering** | Integrated **React Native Background Task API** to ensure reliable alerts. |

---

## 🎯 Project Outcomes
- Successfully developed a **fully functional** cross-platform mobile application.
- Improved **medication adherence rates** by integrating **interactive feedback and real-time tracking**.
- Implemented **real-world API integrations** for pharmacy search and medication information retrieval.
- Optimized **storage solutions**, reducing Firebase costs while maintaining usability.
- Received **positive user feedback**, validating ease of use and effectiveness.

---

## 📌 Future Roadmap
- **AI-driven medication tracking** to predict adherence patterns.
- **Data visualization for health insights** (e.g., tracking blood pressure, glucose levels, etc.).
- **Customizable notification messages** with voice support.
- **Multilingual support** for global accessibility.

---

## 🔗 Project Links
- **Live Demo (YouTube)**: [https://youtu.be/0-beiGcVAVc]

---

## 💡 Key Takeaways & Reflections
Developing Pillpop was a comprehensive experience that allowed me to **apply my expertise in UX design, mobile development, and real-time data management**. The project required technical problem-solving, a deep understanding of **user behavior**, and an iterative design process. By leveraging **cross-platform development, third-party integrations, and gamification strategies**, I successfully created an engaging and functional medication management solution.

This project has strengthened my passion for **Human-Computer Interaction (HCI), UX/UI design, and AI-driven digital health solutions**. Moving forward, I aim to refine Pillpop’s functionalities and explore its potential for **scalability within digital healthcare ecosystems**.
