const form = document.getElementById('converteForm');
const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const converteAmount = document.getElementById('convertedAmount'); 
const toCurrency = document.getElementById('toCurrency');

const loading = document.querySelector('.loading');
const result = document.querySelector('.result');  
const error = document.querySelector('.erro');      

const api_url = 'https://api.exchangerate-api.com/v4/latest/';

async function convertMoney() {
    loading.style.display = 'block';
    error.style.display = 'none';
    result.style.display = 'none';

    try {
        const response = await fetch(api_url + fromCurrency.value);
        if (!response.ok) {
            throw new Error('Falha ao obter dados da API');
        }

        const data = await response.json();
        const rate = data.rates[toCurrency.value];
        const convertedValue = (amount.value * rate).toFixed(2);

        converteAmount.value = convertedValue;

        result.innerHTML = `
            <div style="font-size: 1.5em;">
                ${amount.value} ${fromCurrency.value} = ${convertedValue} ${toCurrency.value}
            </div>
        `;
        result.style.display = 'block';

        console.log(data);
    } catch (err) {
        console.error('Erro ao buscar os dados:', err);
        error.style.display = 'block';
        error.innerHTML = 'Ocorreu um erro ao buscar os dados. Por favor, tente novamente mais tarde.';
    }

    loading.style.display = 'none';
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    convertMoney();
});
