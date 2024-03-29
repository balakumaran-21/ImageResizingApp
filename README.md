# Image Resizing App

## Introduction

Welcome to the Image Resizing App! This Flask web application allows you to upload images, resize them, and download the resized images as a ZIP file.

## Prerequisites

Before running this application, ensure you have the following installed:

- Python (version 3.6 or higher)
- Flask
- Pillow (Python Imaging Library)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Balakumaran51/imageResizingApp.git
```
2. Navigate to project directory:
```bash
cd imageResizingApp
```
---
Create a virtual environment (optional but recommended):
```bash
python3 -m venv venv
```
---
Activate the virtual environment:
- On Windows:
```bash
venv\Scripts\activate
```
- On macOS and Linux
```bash
source venv/bin/activate
```
1. Install Dependencies
```bash
pip install -r requirements.txt
```

# Usage
1. Run the Flask App:
```bash
python app.py
```
1. Open your web browser and go to http://localhost:2000 to access the application.
2. Click on the "Select or Drag and Drop Images Here" area to upload images.
3. Enter the desired width and height for resizing.
4. Click the "Resize" button to resize the images.
5. Once the resizing is complete, click the "Download" button to download the resized images as a ZIP file.

# Troubleshooting
- If you encounter any issues, ensure that the necessary Python dependencies are installed and that the Flask app is running correctly.
- Check the terminal/console output for any error messages or exceptions.
  
