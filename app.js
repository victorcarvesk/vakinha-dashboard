let goal = 0;
let vakinha = 0;
let pix = 0;
let contributions = 0;
let lastUpdated = '';

fetch('./report.json')
    .then(response => response.json())
    .then(report => {
        lastUpdated = report.last_update;
        goal = report.goal;
        vakinha = report.vakinha;
        pix = report.pix;
        contributions = vakinha + pix;

        updateDOM();
    })
    .catch(error => {
        console.error("Erro ao carregar o arquivo JSON:", error);
    });

function updateDOM() {
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
                backgroundColor: ['#75A250', '#7A7A7A'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Progresso da Vaquinha',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    },
                    color: '#333',
                    align: 'center'
                },
                datalabels: {
                    color: 'white',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    formatter: (value, context) => {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${percentage}%`;
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });

    const ctx2 = document.getElementById('progressChart2').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Pix', 'Vakinha'],
            datasets: [{
                data: [pix, vakinha],
                backgroundColor: ['#32BCAD', '#2B7A77'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Fonte das contribuições',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    },
                    color: '#333',
                    align: 'center'
                },
                datalabels: {
                    color: 'white',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    formatter: (value, context) => {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${percentage}%`;
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}
