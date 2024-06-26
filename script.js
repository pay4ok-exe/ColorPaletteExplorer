const searchInput = document.querySelector("#search-input"),
  searchImage = document.querySelector("#search-image"),
  typeSelect = document.querySelector("#palette-type"),
  typeText = document.querySelector("#type-text"),
  countSelect = document.querySelector("#palette-count"),
  randomBtn = document.querySelector("#random-btn"),
  paletteContainer = document.querySelector("#palette"),
  relatedContainer = document.querySelector("#related"),
  paletteWhich = document.getElementById("palette-which"),
  imageColorsContainer = document.querySelector("#image-colors"),
  imageColorsWrapper = document.querySelector(".image-colors-wrapper");

let currentColor = "skyblue",
  currentType = "analogous",
  currentCount = 6,
  imageColors = [];

function generateAnalogousPalette(hsl, count) {
  const palette = [];
  const [hue, saturation, lightness] = hsl;
  for (let i = 0; i < count; i++) {
    let newHue = hue + 30 * i;
    if (newHue > 360) {
      newHue -= 360;
    }
    palette.push([newHue, saturation, lightness]);
  }
  return palette;
}
function generateMonochromaticPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;

  for (let i = 0; i < count; i++) {
    let newLightness = (lightness = 10 * i);
    if (newLightness > 100) {
      newLightness -= 100;
    }
    palette.push([hue, saturation, newLightness]);
  }
  return palette;
}
function generateTriadicPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;
  for (let i = 0; i < count; i++) {
    let newHue = hue + 120 * i;
    if (newHue > 360) {
      newHue -= 360;
    }
    palette.push([newHue, saturation, lightness]);
  }
  return palette;
}
function generateCompoundPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;
  for (let i = 0; i < count; i++) {
    let newHue = hue + 150 * i;
    if (newHue > 360) {
      newHue -= 360;
    }
    palette.push([newHue, saturation, lightness]);
  }
  return palette;
}
function generateShadesPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;
  for (let i = 0; i < count; i++) {
    let newSaturation = saturation + 10 * i;
    if (newSaturation > 100) {
      newSaturation -= 100;
    }
    palette.push([hue, newSaturation, lightness]);
  }
  return palette;
}
function generateTetradicPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;
  for (let i = 0; i < count; i++) {
    let newHue = hue + 90 * i;
    if (newHue > 360) {
      newHue -= 360;
    }
    palette.push([newHue, saturation, lightness]);
  }
  return palette;
}

function generateSquarePalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;
  for (let i = 0; i < count; i++) {
    let newHue = hue + 60 * i;
    if (newHue > 360) {
      newHue -= 360;
    }
    palette.push([newHue, saturation, lightness]);
  }
  return palette;
}
function generateRelatedColorPalette(hsl, count) {
  const palette = [];
  const [hue, saturation, lightness] = hsl;
  palette.push([hue, (saturation + 20) % 100, lightness]);
  palette.push([hue, (saturation - 20) % 100, lightness]);
  palette.push([hue, saturation, (lightness + 20) % 100]);
  palette.push([hue, saturation, (lightness - 20) % 100]);

  palette.push([(hue + 20) % 360, saturation, lightness]);

  palette.push([(hue - 20) % 360, saturation, lightness]);

  for (let i = palette.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [palette[i], palette[j]] = [palette[j], palette[i]];
  }

  return palette;
}
function generatePalette(hsl, type, count) {
  switch (type) {
    case "analogous":
      return generateAnalogousPalette(hsl, count);
    case "monochromatic":
      return generateMonochromaticPalette(hsl, count);
    case "triadic":
      return generateTriadicPalette(hsl, count);
    case "compound":
      return generateCompoundPalette(hsl, count);
    case "shades":
      return generateShadesPalette(hsl, count);
    case "tetradic":
      return generateTetradicPalette(hsl, count);
    case "square":
      return generateSquarePalette(hsl, count);
    case "related":
      return generateRelatedColorPalette(hsl, count);
  }
}
function generatePaletteHtml(type, container) {
  let color = currentColor;
  let count = currentCount;
  const hsl = getHslFromColor(color);

  if (!hsl) return;
  let palette = [];
  container.innerHTML = "";

  if (type === "image-colors") {
    palette = imageColors;
  } else {
    palette = generatePalette(hsl, type, count);
  }
  palette.forEach((color) => {
    if (type != "image-colors") {
      color = HslToHex(color);
    }
    const colorEl = document.createElement("div");
    colorEl.classList.add("color");
    colorEl.style.backgroundColor = color;
    colorEl.innerHTML = `
        <div class="overlay ">
          <div class="icons">
            <div class="copy-color" title="Copy Color code">
              <i class="far fa-copy"></i>
            </div>
            <div class="generate-palette title="Generate Palette">
              <i class="fas fa-palette"></i>
            </div>
          </div>
          <div class="code">${color}</div>
        </div>
    `;
    container.appendChild(colorEl);
  });
}
function getHslFromColor(color) {
  let hsl;
  if (isValidColor(color)) {
    let temp = document.createElement("div");
    temp.style.color = color;
    document.body.appendChild(temp);
    let styles = window.getComputedStyle(temp, null);
    let rgb = styles.getPropertyValue("color");
    document.body.removeChild(temp);
    rgb = removeRGB(rgb);
    hsl = rgbToHsl(rgb);
    return hsl;
  }
}

function removeRGB(rgb) {
  return rgb.replace("rgb(", "").replace(")", "").split(",");
}

function isValidColor(color) {
  return CSS.supports("color", color);
}

function rgbToHsl(rgb) {
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;

  let cmin = Math.min(r, g, b);
  let cmax = Math.max(r, g, b);
  let delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = (cmin + cmax) / 2;
  if (delta === 0) {
    h = 0;
    s = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) {
    h += 360;
  }
  if (delta !== 0) {
    s = Math.round((delta / (1 - Math.abs(2 * l - 1))) * 100);
  }
  l = Math.round(l * 100);
  return [h, s, l];
}

function HslToHex(hsl) {
  let h = hsl[0];
  let s = hsl[1];
  let l = hsl[2];
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

generatePaletteHtml("analogous", paletteContainer);
generatePaletteHtml("compound", relatedContainer);

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value;
  if (isValidColor(value)) {
    currentColor = value;
    generatePaletteHtml("monochromatic", paletteContainer);
    generatePaletteHtml("compound", relatedContainer);
  }
});

typeSelect.addEventListener("change", (e) => {
  const value = e.target.value;
  currentType = value;

  typeText.textContent = value + "Palette";
  generatePaletteHtml(currentType, paletteContainer);
});

countSelect.addEventListener("change", (e) => {
  const value = e.target.value;
  currentCount = value;
  generatePaletteHtml(currentType, paletteContainer);
});

randomBtn.addEventListener("click", (e) => {
  const randomColor = getRandomColor();
  searchInput.value = randomColor;
  currentColor = randomColor;
  generatePaletteHtml(currentType, paletteContainer);
  generatePaletteHtml("compound", relatedContainer);
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const pickr = Pickr.create({
  el: ".color-picker",
  theme: "classic", 

  swatches: [
    "rgba(244, 67, 54, 1)",
    "rgba(233, 30, 99, 0.95)",
    "rgba(156, 39, 176, 0.9)",
    "rgba(103, 58, 183, 0.85)",
    "rgba(63, 81, 181, 0.8)",
    "rgba(33, 150, 243, 0.75)",
    "rgba(3, 169, 244, 0.7)",
    "rgba(0, 188, 212, 0.7)",
    "rgba(0, 150, 136, 0.75)",
    "rgba(76, 175, 80, 0.8)",
    "rgba(139, 195, 74, 0.85)",
    "rgba(205, 220, 57, 0.9)",
    "rgba(255, 235, 59, 0.95)",
    "rgba(255, 193, 7, 1)",
  ],

  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      hex: true,
      rgba: true,
      hsla: true,
      hsva: false,
      cmyk: false,
      input: true,
      clear: false,
      save: true,
    },
  },
});
pickr
  .on("change", (...args) => {
    let color = args[0].toHEXA();
    currentColor = `#${color[0]}${color[1]}${color[2]}`;
    searchInput.value = `#${color[0]}${color[1]}${color[2]}`;
    generatePaletteHtml("analogous", paletteContainer);
    generatePaletteHtml("compound", relatedContainer);
  })
  .on("save", (...args) => {
    let color = args[0].toHEXA();
    currentColor = `#${color[0]}${color[1]}${color[2]}`;
    searchInput.value = `#${color[0]}${color[1]}${color[2]}`;
    generatePaletteHtml("analogous", paletteContainer);
    generatePaletteHtml("compound", relatedContainer);
    pickr.hide();
  });
const palettes = document.querySelectorAll(".palette");
palettes.forEach((palette) => {
  palette.addEventListener("click", (e) => {
    const target = e.target;
    let color = target.parentElement.parentElement.children[1].textContent;

    if (target.classList.contains("copy-color")) {
      copyToClipboard(color);
      toast(`Color ${color} copied to clickboard`);
    } else if (target.classList.contains("fa-copy")) {
      color =
        target.parentElement.parentElement.parentElement.children[1]
          .textContent;
      copyToClipboard(color);
      toast(`Color ${color} copied to clickboard`);
    } else if (target.classList.contains("fa-palette")) {
      color =
        target.parentElement.parentElement.parentElement.children[1]
          .textContent;
      searchInput.value = color;
      generatePaletteHtml(currentType, paletteContainer);
      generatePaletteHtml("related", relatedContainer);
      toast("Palette generated for " + color);
    }
    if (target.classList.contains("generate-palette")) {
      searchInput.value = color;
      generatePaletteHtml(currentType, paletteContainer);
      generatePaletteHtml("related", relatedContainer);
      toast("Palette generated for " + color);
    }
  });
});

function copyToClipboard(text) {
  const input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

function toast(message) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }, 400);
}

searchImage.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const image = new Image();
      image.src = reader.result;
      image.onload = function () {
        extractColorsFromImage(image);
      };
    };
  }
});

function extractColorsFromImage(image) {
  colorjs.prominent(image, { amount: 6, format: "hex" }).then((color) => {
    console.log(color);
    imageColors = [];
    imageColors.push(...color);
    generatePaletteHtml("image-colors", imageColorsContainer);

    imageColorsWrapper.classList.remove("hidden");
  });
}

const downloadBtn = document.querySelector("#download-btn"),
  downloadFormat = document.querySelector("#download-format"),
  downloadName = document.querySelector("#download-name");

downloadBtn.addEventListener("click", () => {
  const format = downloadFormat.value;
  let name = downloadName.value;
  name = name == "" ? "palette" : name;
  downloadPalette(format, name);
});

function downloadPalette(format, name) {
  let palette;
  if (paletteWhich.value === "1") {
    palette = document.querySelector("#palette");
  } else if (paletteWhich.value === "2") {
    palette = document.querySelector("#related");
  } else if (paletteWhich.value === "3") {
    if (imageColorsContainer.textContent.length === 0) {
      toast(`You don't choose image for color palette`);
    } else {
      palette = document.querySelector("#image-colors");
    }
  }
  const paletteColors = palette.querySelectorAll(".color");

  const colors = [];

  paletteColors.forEach((color) => {
    colors.push(color.style.backgroundColor);
  });

  switch (format) {
    case "png":
      downloadPalettePng(colors, name);
      break;
    case "svg":
      downloadPaletteSvg(colors, name);
      break;
    case "css":
      downloadPaletteCss(colors, name);
      break;
    case "json":
      downloadPaletteJson(colors, name);
      break;
    default:
      break;
  }
}

function downloadPalettePng(colors, name) {
  const canvas = document.createElement("canvas");
  canvas.width = colors.length * 200;
  canvas.height = 1000;
  const ctx = canvas.getContext("2d");

  colors.forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.fillRect(index * 200, 0, 200, 1000);
  });

  const link = document.createElement("a");
  link.download = name + ".png";
  link.href = canvas.toDataURL();
  link.click();
}

function downloadPaletteSvg(colors, name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewbox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  // add all colors in svg
  colors.forEach((color, index) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    const width = 100 / colors.length;
    rect.setAttribute("x", index * width);
    rect.setAttribute("y", 0);
    rect.setAttribute("width", width);
    rect.setAttribute("height", 100);
    rect.setAttribute("fill", color);
    svg.appendChild(rect);
  });
  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement("a");
  downloadLink.download = name + ".svg";
  downloadLink.href = svgUrl;
  downloadLink.click();
}

function downloadPaletteCss(colors, name) {
  const css = `:root{
    ${colors
      .map((color, index) => `--color-${index + 1}: ${color};`)
      .join("\n")}
  }`;

  const blob = new Blob([css], { type: "text/css" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = name + ".css";
  link.href = url;
  link.click();
}

function downloadPaletteJson(colors, name) {
  const json = JSON.stringify(colors);
  const blob = new Blob([json], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = name + ".json";
  link.href = url;
  link.click();
}

const toggle = document.querySelector("#toggle");

toggle.addEventListener("change", (e) => {
  if (e.target.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
