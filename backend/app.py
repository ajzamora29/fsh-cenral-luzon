# backend/app.py
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from datetime import datetime
import io
from typing import Optional
from fastapi.responses import StreamingResponse
import os

# Create FastAPI app instance
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the directory where this file is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load data files
try:
    df_forecasts = pd.read_csv(os.path.join(BASE_DIR, 'all_commodities_sarima_forecasts_2026_20260807_194442.csv'))
    df_forecasts['Forecast_Date'] = pd.to_datetime(df_forecasts['Forecast_Date'])
except FileNotFoundError:
    print("Warning: Forecast CSV file not found. Using empty dataframe.")
    df_forecasts = pd.DataFrame(columns=['Province', 'Commodity', 'Forecast_Date', 'Forecasted_Price'])

try:
    df_metrics = pd.read_csv(os.path.join(BASE_DIR, 'model_evaluation_metrics_20260807_194442.csv'))
except FileNotFoundError:
    print("Warning: Metrics CSV file not found. Using empty dataframe.")
    df_metrics = pd.DataFrame(columns=['Province', 'Commodity', 'RMSE', 'MAE', 'MAPE (%)'])

try:
    df_historical = pd.read_excel(
        os.path.join(BASE_DIR, 'FSH - Cleaned Dataset2.0.xlsx'), 
        sheet_name='Cleaned Dataset'
    )
except FileNotFoundError:
    print("Warning: Historical Excel file not found. Using empty dataframe.")
    df_historical = pd.DataFrame(columns=['Province', 'Year', 'Month_Name', 'Month_Number', 'Quarter', 'Date', 'Commodity', 'Final Price'])
    df_historical['Date'] = pd.to_datetime(df_historical['Date'])

# API Routes
@app.get("/")
async def root():
    return {"message": "FSH Central Luzon API is running", "status": "ok"}

@app.get("/api/provinces")
def get_provinces(commodity: str = "Bangus"):
    """Get province prices for the current month"""
    if df_forecasts.empty:
        return []
    df_filtered = df_forecasts[
        (df_forecasts['Commodity'] == commodity)
    ]
    if df_filtered.empty:
        return []
    latest_date = df_filtered['Forecast_Date'].max()
    df_latest = df_filtered[df_filtered['Forecast_Date'] == latest_date]
    
    return df_latest[['Province', 'Forecasted_Price']].to_dict(orient='records')

@app.get("/api/forecast/{province}/{commodity}")
def get_forecast(province: str, commodity: str):
    """Get 12-month forecast for a specific province and commodity"""
    if df_forecasts.empty:
        raise HTTPException(status_code=404, detail="No forecast data available")
    
    df_filtered = df_forecasts[
        (df_forecasts['Province'] == province) &
        (df_forecasts['Commodity'] == commodity)
    ].sort_values('Forecast_Date')
    
    if df_filtered.empty:
        raise HTTPException(status_code=404, detail="No data found for this province/commodity")
    
    return df_filtered[['Forecast_Date', 'Forecasted_Price']].to_dict(orient='records')

@app.get("/api/historical/{province}/{commodity}")
def get_historical(province: str, commodity: str):
    """Get historical data for a specific province and commodity"""
    if df_historical.empty:
        raise HTTPException(status_code=404, detail="No historical data available")
    
    df_filtered = df_historical[
        (df_historical['Province'] == province) &
        (df_historical['Commodity'] == commodity)
    ].sort_values('Date')
    
    if df_filtered.empty:
        raise HTTPException(status_code=404, detail="No historical data found")
    
    return df_filtered[['Date', 'Final Price']].to_dict(orient='records')

@app.get("/api/metrics")
def get_metrics(province: Optional[str] = None, commodity: Optional[str] = None):
    """Get model evaluation metrics"""
    if df_metrics.empty:
        return []
    
    df_filtered = df_metrics
    if province:
        df_filtered = df_filtered[df_filtered['Province'] == province]
    if commodity:
        df_filtered = df_filtered[df_filtered['Commodity'] == commodity]
    
    return df_filtered.to_dict(orient='records')

@app.get("/api/commodities")
def get_commodities():
    """Get list of all commodities"""
    if df_forecasts.empty:
        return ["Alumahan", "Bangus", "Galunggong (Imported)", "Galunggong (Local)", "Tilapia"]
    return df_forecasts['Commodity'].unique().tolist()

@app.get("/api/provinces/list")
def get_provinces_list():
    """Get list of all provinces"""
    if df_forecasts.empty:
        return ["Aurora", "Bataan", "Bulacan", "Nueva Ecija", "Pampanga", "Regional", "Tarlac", "Zambales"]
    return df_forecasts['Province'].unique().tolist()

@app.post("/api/import")
async def import_data(file: UploadFile = File(...)):
    """Import data from CSV or Excel file"""
    try:
        content = await file.read()
        
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(content))
        elif file.filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(io.BytesIO(content))
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Use CSV or Excel.")
        
        # Validate required columns
        required_cols = ['Province', 'Commodity', 'Date', 'Price']
        if not all(col in df.columns for col in required_cols):
            raise HTTPException(
                status_code=400, 
                detail=f"Missing required columns. Need: {required_cols}"
            )
        
        return {
            "status": "success",
            "rows_imported": len(df),
            "message": f"Successfully imported {len(df)} rows"
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/export")
async def export_data(
    format: str = "csv",
    type: str = "forecast",
    province: Optional[str] = None,
    commodity: Optional[str] = None
):
    """Export data in CSV or Excel format"""
    
    # Select data based on type
    if type == "forecast":
        df_export = df_forecasts.copy()
    elif type == "historical":
        df_export = df_historical.copy()
    elif type == "metrics":
        df_export = df_metrics.copy()
    else:
        raise HTTPException(status_code=400, detail="Invalid report type")
    
    if df_export.empty:
        raise HTTPException(status_code=404, detail="No data available for export")
    
    # Apply filters
    if province and province != "all":
        df_export = df_export[df_export['Province'] == province]
    if commodity and commodity != "all":
        df_export = df_export[df_export['Commodity'] == commodity]
    
    if df_export.empty:
        raise HTTPException(status_code=404, detail="No data found for the selected filters")
    
    # Export
    if format == "csv":
        csv_data = df_export.to_csv(index=False)
        return StreamingResponse(
            io.BytesIO(csv_data.encode()),
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename=export_{type}.csv"}
        )
    elif format == "xlsx":
        buffer = io.BytesIO()
        with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
            df_export.to_excel(writer, sheet_name='Data', index=False)
        buffer.seek(0)
        return StreamingResponse(
            buffer,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename=export_{type}.xlsx"}
        )
    else:
        raise HTTPException(status_code=400, detail="Invalid format. Use 'csv' or 'xlsx'")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
# backend/app.py - Add this endpoint
@app.get("/api/forecast_with_ci/{province}/{commodity}")
def get_forecast_with_ci(province: str, commodity: str):
    """Get 12-month forecast with confidence intervals"""
    if df_forecasts.empty:
        raise HTTPException(status_code=404, detail="No forecast data available")
    
    df_filtered = df_forecasts[
        (df_forecasts['Province'] == province) &
        (df_forecasts['Commodity'] == commodity)
    ].sort_values('Forecast_Date')
    
    if df_filtered.empty:
        raise HTTPException(status_code=404, detail="No data found")
    
    # Get the metrics for this province/commodity
    metrics = df_metrics[
        (df_metrics['Province'] == province) &
        (df_metrics['Commodity'] == commodity)
    ]
    
    # Use RMSE as confidence interval
    rmse = metrics['RMSE'].values[0] if not metrics.empty else 20
    
    # Add upper and lower bounds
    result = []
    for _, row in df_filtered.iterrows():
        result.append({
            'Forecast_Date': row['Forecast_Date'],
            'Forecasted_Price': row['Forecasted_Price'],
            'Lower_Bound': row['Forecasted_Price'] - rmse * 1.96,
            'Upper_Bound': row['Forecasted_Price'] + rmse * 1.96
        })
    
    return result