<p align="center">
  <img src="assets/banner.png" alt="NephroAI Banner" width="100%">
</p>

<h1 align="center">NephroAI</h1>

<p align="center">
AI-Powered Kidney Stone Detection System using CNN, YOLOv8, Random Forest, Flask, and Next.js.
</p>

<p align="center">
Medical Imaging • Computer Vision • Machine Learning • Healthcare AI
</p>

````markdown
# 🧠 AI Pipeline

<p align="center">
  <img src="assets/pipeline.png" alt="NephroAI AI Pipeline" width="90%">
</p>

The AI pipeline follows a multi-stage diagnostic workflow:

1. The user uploads a CT scan image through the web interface.
2. The CNN model analyzes the image and predicts whether a kidney stone is present.
3. If a stone is detected, the image is forwarded to YOLOv8 for precise stone localization.
4. YOLOv8 generates bounding boxes around the detected stone(s).
5. Patient laboratory parameters are processed using a Random Forest model.
6. The imaging prediction and laboratory analysis are combined to generate the final diagnosis.
7. The frontend displays the prediction confidence, stone probability, and annotated detection image.

---

# 🏗️ System Architecture

<p align="center">
  <img src="assets/architecture.png" alt="NephroAI System Architecture" width="95%">
</p>

NephroAI follows a modular architecture where the Next.js frontend communicates with a Flask REST API. The backend orchestrates multiple AI models—including CNN, YOLOv8, and Random Forest—to provide real-time kidney stone detection, localization, and clinical validation.

---

# 📁 Folder Structure

```text
NephroAI
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── Kidney_Stone_API.ipynb
│   ├── models/
│   └── requirements.txt
│
├── assets/
│   ├── banner.png
│   ├── pipeline.png
│   ├── architecture.png
│   ├── landingpage.png
│   ├── upload.png
│   ├── detection.png
│   └── yolo.png
│
├── README.md
├── .gitignore
└── LICENSE
```

---

# 🛠 Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Axios

## Backend

- Python
- Flask

## Artificial Intelligence

- TensorFlow / Keras
- Convolutional Neural Network (CNN)
- YOLOv8
- Random Forest
- OpenCV
- NumPy
- Pandas
- Scikit-learn

## Deployment

- Google Colab
- ngrok
- GitHub

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/chhassam2001-lang/NephroAI.git
cd NephroAI
```

## Install Backend Dependencies

```bash
pip install -r requirements.txt
```

## Install Frontend Dependencies

```bash
cd frontend
npm install
npm run dev
```

---

# 🔌 API Endpoints

## Health Check

```http
GET /
```

Returns the backend status.

---

## Image Prediction

```http
POST /predict
```

### Input

- CT Scan Image (`multipart/form-data`)

### Output

- Prediction
- Confidence Score
- Stone Probability
- YOLO Bounding Boxes
- Annotated Detection Image

---

## Laboratory Prediction

```http
POST /predict-lab
```

### Input

- Age
- Creatinine
- Calcium
- Uric Acid
- pH

### Output

- Prediction
- Confidence Score
- Stone Probability

---

# 📸 Screenshots

## 🏠 Landing Page

<p align="center">
  <img src="assets/landingpage.png" alt="Landing Page" width="90%">
</p>

---

## 📤 CT Scan Upload

<p align="center">
  <img src="assets/upload.png" alt="Upload Page" width="90%">
</p>

---

## 🔍 Prediction Result

<p align="center">
  <img src="assets/detection.png" alt="Detection Result" width="90%">
</p>

---

## 🎯 YOLOv8 Stone Localization

<p align="center">
  <img src="assets/yolo.png" alt="YOLO Detection" width="90%">
</p>

---

# 🎯 Results

- Accurate kidney stone classification using CNN.
- Real-time stone localization with YOLOv8.
- Clinical validation using Random Forest.
- Fast end-to-end AI inference.
- Interactive and responsive web interface.
- AI-powered diagnostic workflow for healthcare applications.

---

# 🚀 Future Improvements

- Cloud deployment
- User authentication
- PACS integration
- Multi-disease kidney diagnosis
- Explainable AI (Grad-CAM)
- Doctor dashboard
- PDF report generation
- Docker deployment
- Kubernetes support

---

# 📬 Contact

**GitHub**

https://github.com/chhassam2001-lang



---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

Your support helps others discover the project and motivates future development.
````
