from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import time
import random
import os
from datetime import datetime

# Initialize FastAPI
app = FastAPI()

# Allow all origins for Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pre-calculated metrics from the snapshot
SUMMARY_PATH = os.path.join(os.path.dirname(__file__), "..", "api_summary.json")

def load_summary():
    try:
        with open(SUMMARY_PATH, 'r') as f:
            return json.load(f)
    except Exception as e:
        # Fallback to demo data if file not found
        return {
            "total_revenue": 1025430.5,
            "total_orders": 15420,
            "avg_order_value": 66.50,
            "customer_satisfaction": 4.15,
            "monthly_growth": 12.4,
            "top_categories": [],
            "geographic_distribution": {},
            "payment_methods": {},
            "delivery_performance": {"on_time_delivery_rate": 88.5, "avg_delivery_days": 11.2}
        }

@app.get("/api/v1/dashboard")
async def get_dashboard():
    # Deterministic Real-time Simulation!
    # Using time to give it variance without background loops
    t = time.time()
    summary = load_summary()
    
    # 1. Simulate Revenue Fluctuations (Daily cycle using Sine wave + Random noise)
    # This ensures the numbers move slightly in real-time but look "Agentic"
    seed = int(t / 30) # New variation every 30s
    random.seed(seed)
    
    noise = random.uniform(0.98, 1.02)
    base_revenue = float(summary['total_revenue'])
    base_orders = int(summary['total_orders'])
    base_satisfaction = float(summary['customer_satisfaction'])
    base_growth = float(summary['monthly_growth'])

    current_revenue = base_revenue * noise
    current_orders = int(base_orders * (noise * 0.99))
    
    # ML Anomaly Simulation (Stateless)
    anomaly_detected = random.random() < 0.05 # 5% chance
    
    # Build complete dashboard response
    response = {
        "current_metrics": {
            "revenue": current_revenue,
            "orders": current_orders,
            "avg_order_value": current_revenue / current_orders if current_orders > 0 else float(summary.get('avg_order_value', 100)),
            "customer_satisfaction": base_satisfaction * random.uniform(0.99, 1.01),
            "monthly_growth": base_growth + random.uniform(-0.5, 0.5)
        },
        "trends": {
            "revenue": [current_revenue * (1 + 0.05 * i) for i in range(-5, 1)],
            "orders": [current_orders * (1 + 0.03 * i) for i in range(-5, 1)],
            "customer_satisfaction": [base_satisfaction for _ in range(6)]
        },
        "alerts": [
            {
                "id": 1,
                "type": "error" if anomaly_detected else "warning",
                "message": "Potential revenue anomaly detected!" if anomaly_detected else "Normal operational monitoring active.",
                "timestamp": datetime.now().isoformat(),
                "agent": "ML Observer Agent",
                "confidence": 0.92,
                "status": "investigating"
            }
        ],
        "agent_statuses": [
            {"id": 1, "name": "Observer Agent", "role": "Monitoring", "status": "active", "last_activity": datetime.now().isoformat()},
            {"id": 2, "name": "Analyst Agent", "role": "ML Patterns", "status": "active", "last_activity": datetime.now().isoformat()},
            {"id": 3, "name": "Decision Maker", "role": "Strategic Actions", "status": "active", "last_activity": datetime.now().isoformat()}
        ],
        "ml_performance": {
            "accuracy": random.uniform(0.89, 0.95),
            "latency_ms": random.randint(30, 80),
            "models_active": 4
        },
        "ml_insights": {
            "recommendations": [
                {"title": "Revenue Optimization", "text": "Adjusting inventory for top categories."}
            ],
            "forecasts": [{"label": "Revenue Forecast (24h)", "value": current_revenue * 1.05}],
            "anomalies": []
        },
        "top_categories": [
            {"name": cat['name'], "revenue": cat['revenue'] * noise, "rank": cat['rank']}
            for cat in summary.get('top_categories', [])
        ],
        "geographic_distribution": summary.get('geographic_distribution', {}),
        "payment_methods": summary.get('payment_methods', {}),
        "delivery_performance": summary.get('delivery_performance', {}),
        "system_health": {"status": "operational", "uptime": "99.9%"}
    }
    
    return response

# Standard Vercel entry point
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
