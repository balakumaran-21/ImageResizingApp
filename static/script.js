function showSnackbar(message, type) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;

    // Remove all existing classes
    snackbar.classList.remove('error', 'loading', 'success');

    // Apply the appropriate class based on the message type
    if (type === 'error') {
        snackbar.classList.add('error');
    } else if (type === 'loading') {
        snackbar.classList.add('loading');
    } else if (type === 'success') {
        snackbar.classList.add('success');
    }

    snackbar.style.display = 'block';
    setTimeout(() => {
        snackbar.style.display = 'none';
    }, 4000); // 4 seconds
}

//    document.getElementById('fileInput').addEventListener('change', () => {
//    const files = document.getElementById('fileInput').files;
//    const thumbnailContainer = document.getElementById('thumbnailContainer');
//    thumbnailContainer.innerHTML = ''; // Clear existing thumbnails
//
//    for (const file of files) {
//        const thumbnail = document.createElement('div');
//        thumbnail.classList.add('thumbnail-container');
//        const image = document.createElement('img');
//        image.classList.add('thumbnail');
//        image.src = URL.createObjectURL(file);
//        image.alt = file.name;
//        thumbnail.appendChild(image);
//        const removeButton = document.createElement('span');
//        removeButton.classList.add('remove-thumbnail');
//        removeButton.innerHTML = '&times;';
//        removeButton.addEventListener('click', () => {
//            thumbnail.remove();
//        });
//        thumbnail.appendChild(removeButton);
//        thumbnailContainer.appendChild(thumbnail);
//    }
//});

document.getElementById('fileInput').addEventListener('change', () => {
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    thumbnailContainer.innerHTML = ''; // Clear existing thumbnails

    const files = [];

    for (const file of document.getElementById('fileInput').files) {
        files.push(file); // Add file to the list of files to be uploaded
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail-container');
        const image = document.createElement('img');
        image.classList.add('thumbnail');
        image.src = URL.createObjectURL(file);
        image.alt = file.name;
        thumbnail.appendChild(image);
        const removeButton = document.createElement('span');
        removeButton.classList.add('remove-thumbnail');
        removeButton.innerHTML = '&times;';
        removeButton.addEventListener('click', () => {
            thumbnail.remove();
            // Remove the corresponding file from the list of files to be uploaded
            const index = files.indexOf(file);
            if (index !== -1) {
                files.splice(index, 1);
            }
        });
        thumbnail.appendChild(removeButton);
        thumbnailContainer.appendChild(thumbnail);
    }

    document.getElementById('uploadForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const width = document.getElementById('width').value;
        const height = document.getElementById('height').value;

        // Check if no file is selected
        if (files.length === 0) {
            showSnackbar('Please select a file to upload.', 'error');
            return;
        }

        if (!width || !height) {
            showSnackbar('Please enter both width and height.', 'error');
            return;
        }

        const formData = new FormData();
        for (const file of files) {
            formData.append('file', file);
        }

        // Append width and height parameters to the form data
        formData.append('width', width);
        formData.append('height', height);

        showSnackbar('Resizing Images...', 'loading');

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.style.display = 'block';
            downloadLink.querySelector('#downloadButton').setAttribute('href', URL.createObjectURL(await response.blob()));

            // Show success message as snackbar
            showSnackbar('Click on download to continue.', 'success');
        } catch (error) {
            console.error('Error uploading files:', error);
            // Show error message as snackbar
            showSnackbar('Error uploading files: ' + error.message, 'error');
        }
    });
});



    document.getElementById('downloadButton').addEventListener('click', () => {
        // Hide download button after clicking download
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.style.display = 'none';
    });