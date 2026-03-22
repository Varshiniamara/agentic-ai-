# 🤖 Agentic AI — Autonomous Business Decision System

A multi-agent AI system that continuously monitors business metrics, detects anomalies, and makes intelligent autonomous decisions in real time.

> ⚠️ **Note**: There is no live deployment link at this time. Please run locally using the instructions below.

---

## 🎯 What It Does

- **Monitors** business KPIs (revenue, orders, customer satisfaction) every 30 seconds
- **Detects** anomalies using ML (Isolation Forest, Z-Score analysis)
- **Forecasts** future trends using ARIMA and Linear Regression
- **Makes decisions** autonomously with confidence scoring and human approval checkpoints
- **Visualizes** everything on a real-time enterprise dashboard

---

## 🏗️ Architecture

```
Frontend (Next.js)  ←→  Backend (FastAPI)  ←→  AI Agents (Multi-Agent)
                              ↕
                       ML Services & Analytics
                       (Scikit-learn, Pandas)
                              ↕
                    Brazilian E-commerce Dataset
                         (99,441 orders)
```

---

## 🤖 AI Agents

| Agent | Role |
|---|---|
| **Observer Agent** | Monitors metrics and detects changes |
| **Analyst Agent** | Root-cause analysis and trend detection |
| **Decision Agent** | Strategic decisions with ML confidence scores |
| **Simulation Agent** | "What-if" scenario modeling |
| **Governance Agent** | Policy enforcement and approval workflows |

---

## 🧠 ML Features

- **Anomaly Detection** — Isolation Forest
- **Revenue Forecasting** — Linear Regression + ARIMA
- **Customer Segmentation** — RFM Analysis
- **Real-time Inference** — Predictions every 30 seconds
- **Confidence Heatmap** — Decision confidence scoring

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Recharts |
| Backend | FastAPI, Python 3.11, Asyncio |
| ML | Scikit-learn, Pandas, NumPy |
| Data | Brazilian E-commerce Dataset (Olist) |

---

## 🚀 Run Locally

### Prerequisites
- Python 3.8+
- Node.js 16+

### 1. Clone the repo
```bash
git clone https://github.com/Varshiniamara/agentic-ai-
cd agentic-ai-
```

### 2. Start the Backend
```bash
cd backend
pip install -r requirements.txt
python production_server.py
```

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Open the Dashboard
```
http://localhost:3000
```

---

## 📁 Project Structure

```
agentic-ai-/
├── agents/          # Multi-agent AI system
├── backend/         # FastAPI server + ML services
├── frontend/        # Next.js dashboard
├── data/            # E-commerce dataset (CSV)
└── docker/          # Docker configuration
```

---

## 📊 Key Stats

- **99,441+** real orders processed from the Olist dataset
- **5** specialized AI agents working in coordination
- **4+** active ML models running in parallel
- **30-second** real-time update cycles
- **15+** REST API endpoints

---

*Built for the Vibe Coding Hackathon — demonstrating enterprise-grade Agentic AI for autonomous business decision-making.*
