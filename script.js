const container = document.getElementById("container");
const loader = document.getElementById("loader");

let images = [];
let loadedImages = 0;
let totalImages = 0;
let isReady = false;

const count = 25;
const apiKey = "zV2xQ6tkb5d2mJQpP03Ns1MvIcv9ayQcVmvCkXWXlgk";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  loadedImages++;
  if (loadedImages === totalImages) {
    isReady = true;
    loader.hidden = true;
  }
}

function setAttrs(element, attr) {
  for (let key in attr) {
    element.setAttribute(key, attr[key]);
  }
}

function displayImages() {
  loadedImages = 0;
  totalImages = images.length;

  images.forEach((image) => {
    const item = document.createElement("a");
    const img = document.createElement("img");

    setAttrs(item, {
      href: image.links.html,
      target: "_blank",
    });

    setAttrs(img, {
      src: image.urls.regular,
      alt: image.alt_description,
      title: image.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    container.appendChild(item);
  });
}

async function getImages() {
  try {
    const response = await fetch(apiUrl);
    images = await response.json();
    displayImages();
  } catch (error) {
    console.log(error);
  }
}

getImages();

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    isReady
  ) {
    isReady = false;
    getImages();
  }
});
