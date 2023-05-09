const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const inputImagesContainer = document.getElementById('inputImages');

imageInput.addEventListener('change', loadImages);
preview.addEventListener('click', downloadImage);

function loadImages() {
    if (!imageInput.files.length) return;
    inputImagesContainer.innerHTML = '';
    const imageUrls = Array.from(imageInput.files).map(file => URL.createObjectURL(file));
    let images = [];
    let imagesLoaded = 0;

    imageUrls.forEach((url, index) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            imagesLoaded++;
            images[index] = img;
            const inputImage = document.createElement('img');
            inputImage.src = url;
            inputImage.style.width = '200px';
            inputImage.style.margin = '5px';
            inputImagesContainer.appendChild(inputImage);

            if (imagesLoaded === imageUrls.length) {
                combineImages(images);
            }
        };
    });
}

function combineImages(images) {
    canvas.width = images[0].width;
    canvas.height = images[0].height;
    images.forEach(img => {
        ctx.drawImage(img, 0, 0, img.width, img.height);
    });
    const combinedImage = canvas.toDataURL('image/png');
    preview.src = combinedImage;
    preview.style.display = 'block';
    document.querySelector('.arrow').style.display = "inline-block"; 
    preview.setAttribute('data-full-image-url', combinedImage);
}

function downloadImage() {
    const fullImageUrl = preview.getAttribute('data-full-image-url');
    const downloadLink = document.createElement('a');
    downloadLink.href = fullImageUrl;
    downloadLink.download = 'combined-image-mask.png';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
