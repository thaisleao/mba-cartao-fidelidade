async function getAllClients () {
  const promise = await fetch('http://localhost:3000/clients')
  const clients = await promise.json()
  return clients;
}

function fillProfile (client) {
  const clientName = document.getElementById('client');
  const clientSince = document.getElementById('clientSince');
  clientName.innerHTML = client.name;
  clientSince.innerHTML = client.clientSince;
}

function fillFidelityCard (client) {
  const userId = document.getElementById('userId');
  const totalCuts = client.appointmentHistory.length;
  const cardsTotalCuts = document.getElementById('cardsTotalCuts');
  let htmlCards = '';
  for (let i = 0; i < 9; i++) {
    if (i < totalCuts) {
      htmlCards += '<div class="item"><img src="./assets/PinCheck.png" alt="Pin Check" class="pinCheck" /></div>';
    } else {
      htmlCards += '<div class="item"></div>';
    }
  }
  htmlCards += '<div class="item"><i class="ph ph-gift icon"></i></div>';

  userId.innerHTML = `ID: ${client.id}`;
  cardsTotalCuts.innerHTML = htmlCards;
}

function fillHistory (client){
  const totalCuts = document.getElementById('totalCuts');
  const cutsHistory = document.getElementById('cutsHistory');
  let htmlCutsHistory = '';

  totalCuts.innerHTML = client.loyaltyCard.totalCuts > 1 ? `${client.loyaltyCard.totalCuts} cortes` : `${client.loyaltyCard.totalCuts} corte`;
  client.appointmentHistory.forEach((appointment) => {
    htmlCutsHistory += `<div class="item">
            <div>
              <p>${appointment.date}</p>
              <span>${appointment.time}</span>
            </div>
            <i class="ph ph-seal-check icon"></i>
          </div>`
  });
  cutsHistory.innerHTML = htmlCutsHistory;
}

function fillRemainingCuts (loyaltyCard) {
  const remainingCuts = document.getElementById('remainingCuts');
  const summaryCuts = document.getElementById('summaryCuts');

  remainingCuts.innerHTML = loyaltyCard.cutsRemaining > 1 ? `<span>${loyaltyCard.cutsRemaining}</span> cortes restantes` : `<span>${loyaltyCard.cutsRemaining}</span> corte restante`;
  summaryCuts.innerHTML = `${loyaltyCard.totalCuts} de ${loyaltyCard.cutsNeeded}`
}

async function searchClient () {
  const clients = await getAllClients();
  const searchInput = document.getElementById('input');
  const client = clients.find(client => client.id == searchInput.value);

  fillProfile(client);
  fillFidelityCard(client);
  fillHistory(client);
  fillRemainingCuts(client.loyaltyCard);
}

function init () {

  const buttonSearch = document.getElementById("inputIcon");
  buttonSearch.addEventListener('click', () => searchClient());
}

init();