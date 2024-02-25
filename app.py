import zipfile
import os

from PIL import Image
from flask import Flask, render_template, url_for, send_file, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

UPLOAD_FOLDER = 'uploads'
RESIZED_FOLDER = 'resized_images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESIZED_FOLDER'] = RESIZED_FOLDER

def resize(image, resized_width, resized_height):
    resized_image = image.resize((resized_width, resized_height))
    return resized_image

@app.route('/upload', methods=["GET", "POST"])
def upload_files():
    uploaded_files = request.files.getlist("file")
    resized_width = int(request.form['width']) # Get width parameter from the form
    resized_height = int(request.form['height']) # Get height parameter from the form
    print(resized_height,resized_width)
    if not uploaded_files:
        return jsonify({'error': 'No file uploaded'}), 400

    resized_images = []

    for file in uploaded_files:
        if file.filename == '':
            continue

        # Save original uploaded file
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)

        # Resize the image
        img = Image.open(filename)
        resized_image = resize(img, resized_width, resized_height)
        resized_filename = os.path.join(app.config['RESIZED_FOLDER'], 'resized_' + file.filename)
        resized_image.save(resized_filename)
        resized_images.append(resized_filename)

    # Compress resized images into a zip file
    zip_filename = 'resized_images.zip'
    with zipfile.ZipFile(zip_filename, 'w') as zipf:
        for image in resized_images:
            zipf.write(image)
    delete_files()
    # Serve the zip file for download
    return send_file(zip_filename, as_attachment=True)

def delete_files():
 # Remove files from upload and resized folder after download is completed
    for file in os.listdir(UPLOAD_FOLDER):
        os.remove(os.path.join(UPLOAD_FOLDER, file))
    for file in os.listdir(RESIZED_FOLDER):
        os.remove(os.path.join(RESIZED_FOLDER, file))

if __name__ == '__main__':
    app.run(debug=True, port=2000)
