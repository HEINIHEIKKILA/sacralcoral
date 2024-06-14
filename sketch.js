let kuvat = [];
let kuvatData = [];
let alphaValues = [100, 100, 110, 100, 150, 90, 80, 120, 70, 150, 100, 76];
let video;
let speedFactor = 7;
let noiseOffsetX = 350;
let noiseOffsetY = 250; // Eri offset arvo Y-akselille

function preload() {
  kuvat[0] = loadImage('Image 10.6.2024 at 12.44.jpg');
  kuvat[1] = loadImage('Screenshot 2024-06-09 at 14.00.33.png');
  kuvat[2] = loadImage('Bubblegum-coral-Paragorgia-sp-from-Atlantis-Bank-Seamount-South-West-Indian-Ridge.ppm');
  kuvat[3] = loadImage('Image 9.6.2024 at 10.36.jpg');
  kuvat[4] = loadImage('Image 9.6.2024 at 10.39.jpg');
  kuvat[5] = loadImage('Image 9.6.2024 at 7.47.jpg');
  kuvat[6] = loadImage('Screenshot 2024-06-09 at 14.00.33.png');
  kuvat[7] = loadImage('Image 10.6.2024 at 12.44.jpg');
  kuvat[8] = loadImage('Image 10.6.2024 at 12.44.jpg');
  kuvat[9] = loadImage('Image 9.6.2024 at 10.41.jpg');
  kuvat[10] = loadImage('Screenshot 2024-06-09 at 14.00.33.png');
  kuvat[11] = loadImage('Image 9.6.2024 at 10.39.jpg');
  video = createVideo(['untitled.mp4']); // Vaihda 'untitled.mov' videon polkuun omalla koneellasi
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video.loop(); // Toista video automaattisesti
  video.speed(1000 / speedFactor); // Hidasta videon toistoa

  // Alustetaan kuvatiedot
  for (let i = 0; i < kuvat.length; i++) {
    kuvat[i].resize(15, 0); // Skaalaa kuvat samanlevyisiksi, mutta säilyttää suhteen
    kuvatData.push({
      x: random(2),
      y: random(2),
      img: kuvat[i],
      noiseOffsetX: random(150), // Eri noise offset jokaiselle kuvalle
      noiseOffsetY: random(5000) + 1000, // Eri noise offset jokaiselle kuvalle
      alpha: alphaValues[i]
    });
  }
}

function draw() {
  background(220, 30, 95, 1); // Vaaleansininen tausta

  // Piirretään ja liikutetaan kuvia sumuisella aaltoliikkeellä
  for (let i = 0; i < kuvat.length; i++) {
    let imgData = kuvatData[i];
    let img = imgData.img;
    
    let offsetX = map(noise(imgData.noiseOffsetX), 3, 0, -2000, 6)
    let offsetY = map(noise(imgData.noiseOffsetY), 2, 0, -2000, 9);
    
    let alpha = imgData.alpha; // Käytetään ennalta määriteltyä alfa-arvoa
    
    tint(500, alpha); // Sumuisuus ja läpinäkyvyys
    image(img, imgData.x * 500 + offsetX, imgData.y * 500 + offsetY);
    
    imgData.noiseOffsetX += 0.002;
    imgData.noiseOffsetY += 0.002;
  }

  // Näytetään video sumuisena ja blendataan kuviin
  blendMode(BLEND); // Valitse sopiva blend mode
  tint(150, 200, 100, 5); // Puoliläpinäkyvyys videolle
  image(video, 0, 0, width, height);
  blendMode(OVERLAY); // Palauta normaali blend mode
}
