## 📸 GallerySync

### Description

GallerySync is a photo curation app where users can search for images using the **Unsplash API**, save them to collections, add tags, search by tags, and track search history. Built with **Node.js, Express, and Supabase**, it provides a seamless experience for managing images efficiently. API endpoints are tested using **Jest**.

---

### 🚀 Live Demo

🔗 **Live URL**: [https://gallerysync-backend.onrender.com/](#)  
🔗 **API Documentation**: [Postman Collection](#)

---

### ⚡ Features

✅ **Search Images** from Unsplash API  
✅ **Save Images** to custom collections  
✅ **Add & Search by Tags** for easy filtering  
✅ **Track Search History** to revisit past searches  
✅ **Jest-Tested API Endpoints** for reliability  
✅ **RESTful API Design** for easy integration

---

### 🔥 API Endpoints

| Method | Endpoint                    | Description                   |
| ------ | --------------------------- | ----------------------------- |
| `POST` | `/api/users`                | Create a new user             |
| `GET`  | `/api/photos/search`        | Search images on Unsplash     |
| `POST` | `/api/photos`               | Save an image to a collection |
| `POST` | `/api/photos/:photoId/tags` | Add tags to an image          |
| `GET`  | `/api/photos/tag/search`    | Search images by tag          |
| `GET`  | `/api/search-history`       | View search history           |

---

### 🛠 Tech Stack

- **Backend**: Node.js, Express
- **Database**: Supabase
- **External API**: Unsplash API
- **Testing**: Jest
- **Hosting**: Render

---

### 📌 Installation & Setup

```bash
git clone https://github.com/your-repo/gallerysync.git
cd gallerysync
npm install
npm run dev
```

Run tests:

```bash
npm run test
```

---

### 📜 License

This project is licensed under **MIT License**.

---
