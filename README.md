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

#### 🙎‍♂️ Create User (`POST /api/users`)

<img width="969" alt="Image" src="https://github.com/user-attachments/assets/b50cb229-199d-48f6-90f3-ae8c1233b0b0" />

---

#### 🔍 Search Image (`GET /api/photos/search`)

<img width="983" alt="Image" src="https://github.com/user-attachments/assets/318f1c4e-8461-48e8-932b-5999d6fa2c7b" />

---

#### 💾 Save Image (`POST /api/photos`)

<img width="972" alt="Image" src="https://github.com/user-attachments/assets/8757efef-92b9-4a00-ad55-408f19130bd0" />

---

#### 🏷️ Add Tags (`POST /api/photos/:photoId/tags`)

<img width="970" alt="Image" src="https://github.com/user-attachments/assets/86acc54a-6841-4ce6-96e5-366d56ffb033" />

---

#### 🔎 Search by Tag (`GET /api/photos/tag/search`)

<img width="1053" alt="Image" src="https://github.com/user-attachments/assets/da916b5a-c846-41a1-98da-e8ab87e30b74" />

---

#### 🕒 View Search History (`GET /api/search-history`)

<img width="964" alt="Image" src="https://github.com/user-attachments/assets/a20dfaa2-ea53-4766-91b8-eb8b1d504dee" />

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
git clone https://github.com/AkshAI-2030/GallerySync-Backend
cd GallerySync-Backend
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

## 🔧 Configuration

To run this project locally, create a `.env` file in the root directory and include the following environment variables:

```ini
# Unsplash API Keys (Required for image search)
UNSPLASH_ACCESS_KEY="your_unsplash_access_key"
UNSPLASH_SECRET_KEY="your_unsplash_secret_key"

# Database Configuration (Supabase PostgreSQL)
DB_USER="your_db_user"
DB_PASSWORD="your_db_password"
DB_NAME="your_db_name"
DB_HOST="your_db_host"
DB_PORT=5432

# Server Configuration
PORT=3000
MICROSERVICE_BASE_URL="https://api.unsplash.com"
```

## 📜 License

This project is licensed under the **MIT License**.

---

Feel free to contribute, report issues, or suggest improvements! 🚀

