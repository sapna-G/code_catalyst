document.addEventListener("DOMContentLoaded", function () {
    getDailyQuote(); // Initialize the daily quote

    const healthForm = document.getElementById("healthForm");
    const streakCountElement = document.getElementById("streakCount");
    const achievementsList = document.getElementById("achievementsList");

    let streakCount = 0;
    let waterData = [0];
    let calorieData = [0];
    let exerciseData = [0];

    // Chart.js setup
    const waterChart = new Chart(document.getElementById('waterChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Water'],
            datasets: [{
                label: 'ml',
                data: waterData,
                backgroundColor: ['#4BC0C0']
            }]
        }
    });

    const calorieChart = new Chart(document.getElementById('calorieChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Calories'],
            datasets: [{
                label: 'kcal',
                data: calorieData,
                backgroundColor: ['#FF6384']
            }]
        }
    });

    const exerciseChart = new Chart(document.getElementById('exerciseChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Exercise'],
            datasets: [{
                label: 'Minutes',
                data: exerciseData,
                backgroundColor: ['#36A2EB']
            }]
        }
    });

    const weeklyChart = new Chart(document.getElementById('weeklyChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Water (ml)',
                    data: Array(7).fill(0),
                    borderColor: '#4BC0C0',
                    fill: false
                },
                {
                    label: 'Calories (kcal)',
                    data: Array(7).fill(0),
                    borderColor: '#FF6384',
                    fill: false
                },
                {
                    label: 'Exercise (min)',
                    data: Array(7).fill(0),
                    borderColor: '#36A2EB',
                    fill: false
                }
            ]
        }
    });

    healthForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const water = parseInt(document.getElementById("water").value);
        const calories = parseInt(document.getElementById("calories").value);
        const exercise = parseInt(document.getElementById("exercise").value);

        updateCharts(water, calories, exercise);
        updateAchievements(water, calories, exercise);
        updateStreak(water, calories, exercise);
        updateWeeklyChart(water, calories, exercise);

        healthForm.reset();
    });

    function updateCharts(water, calories, exercise) {
        waterData[0] = water;
        calorieData[0] = calories;
        exerciseData[0] = exercise;

        waterChart.update();
        calorieChart.update();
        exerciseChart.update();
    }

    function updateAchievements(water, calories, exercise) {
        const waterGoal = 2000;
        const calorieGoal = 2000;
        const exerciseGoal = 30;

        document.getElementById("waterAchievement").style.textDecoration = water >= waterGoal ? "line-through" : "none";
        document.getElementById("calorieAchievement").style.textDecoration = calories <= calorieGoal ? "line-through" : "none";
        document.getElementById("exerciseAchievement").style.textDecoration = exercise >= exerciseGoal ? "line-through" : "none";
    }

    function updateStreak(water, calories, exercise) {
        if (water >= 2000 && calories <= 2000 && exercise >= 30) {
            streakCount++;
        } else {
            streakCount = 0;
        }
        streakCountElement.textContent = streakCount;
    }

    function updateWeeklyChart(water, calories, exercise) {
        const today = new Date().getDay(); // 0 (Sun) - 6 (Sat)
        const index = today === 0 ? 6 : today - 1;

        weeklyChart.data.datasets[0].data[index] = water;
        weeklyChart.data.datasets[1].data[index] = calories;
        weeklyChart.data.datasets[2].data[index] = exercise;

        weeklyChart.update();
    }
});




document.body.appendChild(goalsBox);

snackTableBox.className = "snack-table-box";
snackTableBox.innerHTML = `
    <h4>🍽️ Weekly Snack Guide</h4>
    <table>
        <thead>
            <tr>
                <th>Day</th>
                <th>Snack Suggestion</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Sunday</td><td>Banana with peanut butter</td></tr>
            <tr><td>Monday</td><td>Boiled egg & herbal tea</td></tr>
            <tr><td>Tuesday</td><td>Handful of almonds</td></tr>
            <tr><td>Wednesday</td><td>Low-fat yogurt</td></tr>
            <tr><td>Thursday</td><td>Warm milk with cinnamon</td></tr>
            <tr><td>Friday</td><td>Apple slices with almond butter</td></tr>
            <tr><td>Saturday</td><td>Cottage cheese with berries</td></tr>
        </tbody>
    </table>
`;

