const goal = 15000;
const vakinha = 5310;
const pix = 3600;
const contributions = vakinha + pix;
const lastUpdated = '25 nov 2024, 06:00';

document.getElementById('goal').textContent = goal.toLocaleString('pt-BR');
document.getElementById('vakinha').textContent = vakinha.toLocaleString('pt-BR');
document.getElementById('pix').textContent = pix.toLocaleString('pt-BR');
document.getElementById('contributions').textContent = contributions.toLocaleString('pt-BR');

const vakinha_percent = ((vakinha / goal) * 100).toFixed(2);
document.getElementById('vakinha_percent').textContent = vakinha_percent;

const pix_percent = ((pix / goal) * 100).toFixed(2);
document.getElementById('pix_percent').textContent = pix_percent;

const contributions_percent = ((contributions / goal) * 100).toFixed(2);
document.getElementById('contributions_percent').textContent = contributions_percent;

document.getElementById('last_update').textContent = lastUpdated;


const ctx = document.getElementById('progressChart').getContext('2d');
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Alcançado', 'Faltante'],
        datasets: [{
            data: [contributions, goal - contributions],
            backgroundColor: ['#92D050', '#D9D9D9'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    }
});
