document.getElementById('bmi-calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;

    const bmi = calculateBMI(height, weight);
    const calories = calculateCalories(height, weight, age, gender);

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = `
        <div class="result">
            <p><strong>BMI:</strong> ${bmi.toFixed(2)}</p>
        </div>
        <div class="result">
            <p><strong>Required Daily Calories:</strong> ${calories.toFixed(2)} kcal</p>
        </div>
    `;
});

function calculateBMI(height, weight) {
    // Height in meters
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

function calculateCalories(height, weight, age, gender) {
    let bmr;
    if (gender === 'male') {
        // BMR calculation for men
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        // BMR calculation for women
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    // Assuming a moderate activity level (BMR * 1.55)
    return bmr * 1.55;
}
