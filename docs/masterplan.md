**`masterplan.md`**

## **1\. Implementation Plan & Scope**

### **🔍 Overview**

**Project**: Interaction Diary  
 **Description**: A minimalist web app showcasing interface animations. The main feature is video scrub-by-hover playback inside iPhone mockups. Users can:

* View animations by category

* Scrub through videos with cursor hover

* Bookmark favorite animations (stored via `localStorage`)

* Share links to individual animations

* View a static About page

### **🧱 Tech Stack**

* **Frontend**: Lovable AI (no-code/low-code platform)

* **Video Hosting**: Uploadcare (.mp4 files)

* **State**: Local storage

* **Dev tools**: Local-only dev page for managing new video entries

---

### **🔧 Development Phases**

#### **✅ Phase 1 — MVP**

* Home page \= first category (`/transitions`)

* Dark background, videos placed in vertical stack

* iPhone mockup around videos

* Hover-based scrubbing with mouse (cursor controls playback position)

* Category pages: `/transitions`, `/microanimations, /camera, /navigation, /morphing, /gestures`

* Category list fixed in bottom-left

* Header with logo, `Bookmarks` icon \+ text “saved”, and `About` link named “info”

* Bookmark system using `localStorage`

* Bookmarks page: `/bookmarks`

* About page: `/about`

* Individual animation routes: `/category/video-id`

#### **🧪 Phase 2 — Internal Admin Page**

* Local-only dev page: `/dev`

* Form to add:

  * Video URL (.mp4)

  * Title

  * Category

  * (Optional) Thumbnail

* Auto-generate unique slug

* Store metadata in local JSON file or hardcoded array  
* Ability to remove animations from the website from this page

---

## **2\. Design Guidelines**

### **🎨 Colors**

| Purpose | Value |
| ----- | ----- |
| Background | `#000000` |
| Primary text | `#FFFFFF` |
| Secondary text | `#999999` |
| Hover states | Same color, 80% opacity (e.g. `rgba(255,255,255,0.8)`) |

### **🔤 Typography**

* **Font**: SF Pro or Inter 

* **Sizes**:

  * Titles: `40px`, medium

  * Descriptions: `16px`, regular

  * Categories: `16px`, medium

### **🧱 UI Elements**

* **Buttons**: Minimal, icon-based or text-only, no borders

* **Hover Player**:

  * `onMouseMove`: map cursor X to video duration

  * `onMouseLeave`: pause or reset frame

* **Video Mockup**:

  * Responsive iPhone shell

  * Fixed aspect ratio (portrait)  
  * Outlined style

* **Padding / Spacing**:

  * Content padding: `24px` desktop, `16px` mobile

  * Spacing between videos: \~`60px`

  * Max width: `900px`

---

## **3\. App Flow, Pages & Roles**

### **👤 User Roles**

* No auth or sign-in

* All users are equal

* Bookmarks are stored locally

* No backend (yet)

### **📄 Pages & Routes**

| Route | Purpose |
| ----- | ----- |
| `/` or `/gestures` | Home / first animation category |
| `/ios` | iOS animation category |
| `/microanimations` | Micro animation category |
| `/bookmarks` | User’s bookmarked animations |
| `/about` | Static page with project description \+ links |
| `/category/video-id` | Deep link to specific animation (shareable URL) |
| `/dev` (local only) | Dev-only admin form to add/edit animation list |

---

## **✅ Next Steps**

1. Create a local array of \~30 animation objects:

{  
  id: "ios-calendar",  
  title: "iOS Calendar Bounce",  
  category: "ios",  
  videoUrl: "https://ucarecdn.com/c2c8ca6b-7596-4c27-980b-434a0c283c87/"  
}

2. Manually upload .mp4 files to Uploadcare and store returned URLs

3. Build dev form at `/dev` to input new animations

4. Implement scrub-by-hover logic — I’ll help you with cursor → video time mapping

5. Build layout on Lovable AI using basic structure

