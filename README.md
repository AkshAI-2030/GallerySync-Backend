# 📸 GallerySync

GallerySync is a **photo curation app** that allows users to search images via the **Unsplash API**, save them to collections, add searchable tags, and track search history. Built with **Node.js, Express, and Supabase**, it offers a smooth experience for managing and organizing images efficiently. The API endpoints are thoroughly tested using **Jest** for reliability.

---

## 🚀 Live Demo

🔗 **Live URL**: [GallerySync Backend](https://gallerysync-backend.onrender.com/)  
🔗 **API Documentation**: [Postman Collection](#)  

---

## ⚡ Features

✅ **Search Images** via Unsplash API  
✅ **Save Images** to custom collections  
✅ **Add & Search by Tags** for easy filtering  
✅ **Track Search History** to revisit past searches  
✅ **Jest-Tested API Endpoints** for reliability  
✅ **RESTful API Design** for seamless integration  
✅ **Secure & Scalable** architecture using Supabase  

---

## 🔥 API Endpoints

| Method | Endpoint                    | Description                   |
|--------|----------------------------|-------------------------------|
| `POST` | `/api/users`               | Create a new user             |
| `GET`  | `/api/photos/search`       | Search images on Unsplash     |
| `POST` | `/api/photos`              | Save an image to a collection |
| `POST` | `/api/photos/:photoId/tags`| Add tags to an image          |
| `GET`  | `/api/photos/tag/search`   | Search images by tag          |
| `GET`  | `/api/search-history`      | View search history           |

### 📸 Sample API Responses

#### 🔍 Search Images (`GET /api/photos/search`)

![Search API Response](#) *(Sample API Response Screenshot Here)*

#### 💾 Save Image (`POST /api/photos`)

![Save Image Response](#) *(Sample API Response Screenshot Here)*

#### 🏷️ Add Tags (`POST /api/photos/:photoId/tags`)

![Add Tags Response](#) *(Sample API Response Screenshot Here)*

#### 🔎 Search by Tag (`GET /api/photos/tag/search`)

![Search by Tag Response](#) *(Sample API Response Screenshot Here)*

#### 🕒 View Search History (`GET /api/search-history`)

![Search History Response](#) *(Sample API Response Screenshot Here)*

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express  
- **Database**: Supabase  
- **External API**: Unsplash API  
- **Testing**: Jest  
- **Hosting**: Render  

---

## 📌 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/your-repo/gallerysync.git
cd gallerysync
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

Feel free to contribute, report issues, or suggest improvements! 🚀

