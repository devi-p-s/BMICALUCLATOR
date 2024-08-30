// Gauge options
var opts = {
  angle: 0.15,
  lineWidth: 0.44,
  radiusScale: 1.0,
  pointer: {
      length: 0.8,
      strokeWidth: 0.035,
      color: '#000000'
  },
  staticLabels: {
      font: "12px sans-serif",
      labels: [15, 18.5, 25, 30, 35],
      fractionDigits: 1
  },
  staticZones: [
      {strokeStyle: "#F03E3E", min: 0, max: 15},       // Underweight
      {strokeStyle: "#FFDD00", min: 15, max: 18.5},    // Slightly Underweight
      {strokeStyle: "#30B32D", min: 18.5, max: 25},    // Normal
      {strokeStyle: "#FFDD00", min: 25, max: 30},      // Overweight
      {strokeStyle: "#F03E3E", min: 30, max: 35}       // Obese
  ],
  renderTicks: {
      divisions: 5,
      divWidth: 1.2,
      divLength: 0.7,
      divColor: '#333333',
      subDivisions: 3,
      subWidth: 0.6,
      subLength: 0.5,
      subColor: '#666666'
  },
  colorStart: "#6fadcf",
  colorStop: "#8fc0da",
  strokeColor: "#e0e0e0",
  generateGradient: true,
  highDpiSupport: true,
  fontSize: 40
};

// Create gauge instance
var target = document.getElementById('demo');
var gauge = new Gauge(target).setOptions(opts);
gauge.maxValue = 35; // Max value set to the upper limit of Obese
gauge.setMinValue(0);  // Min value
gauge.set(0); // Initial value

// Calculate BMI and update the gauge and result box
function calculateBMI() {
  var weight = parseFloat(document.getElementById("weight").value);
  var height = parseFloat(document.getElementById("height").value) / 100;

  if (!isNaN(weight) && !isNaN(height) && height > 0) {
      var bmi = weight / (height * height);
      gauge.set(bmi);
      document.getElementById("preview-textfield").textContent = bmi.toFixed(1);

      // Update result box with BMI value and condition
      document.getElementById("bmi-number").textContent = bmi.toFixed(1);
      document.getElementById("bmi-condition").textContent = getBMICondition(bmi);

      // Animate result box
      animateResult();
  } else {
      alert("Please enter valid values for weight and height.");
  }
}

// Determine BMI condition
function getBMICondition(bmi) {
  if (bmi < 15) {
      return "Underweight";
  } else if (bmi >= 15 && bmi < 18.5) {
      return "Slightly Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
      return "Normal";
  } else if (bmi >= 25 && bmi < 30) {
      return "Overweight";
  } else {
      return "Obese";
  }
}

// Animate result box for better user feedback
function animateResult() {
  var resultBox = document.querySelector('.result-box');
  resultBox.style.opacity = '0';
  setTimeout(function() {
      resultBox.style.opacity = '1';
  }, 100);
}
