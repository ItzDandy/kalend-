const udalosti = [];

function vygenerujKalendar(roku, mesic) {
  const mesiceNazvy = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
  const dnyNazvy = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];

  const kalendarContainer = document.getElementById('kalendar');
  kalendarContainer.innerHTML = '';

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const trHead = document.createElement('tr');
  dnyNazvy.forEach(nazev => {
    const th = document.createElement('th');
    th.textContent = nazev;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  let dniIndex = 1;
  const prvniDen = (new Date(roku, mesic, 1).getDay() + 6) % 7;

  for (let i = 0; i < 6; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const td = document.createElement('td');
      if (i === 0 && j < prvniDen) {
        td.textContent = '';
      } else if (dniIndex > dnyVMesici(roku, mesic)) {
        td.textContent = '';
      } else {
        td.textContent = dniIndex;
        if (jeAktualniDen(roku, mesic, dniIndex)) {
          td.classList.add('aktualni-den');
        }
        zobrazUdalostiNaDen(td, roku, mesic, dniIndex);
        dniIndex++;
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  kalendarContainer.appendChild(table);
}

function dnyVMesici(roku, mesic) {
  return new Date(roku, mesic + 1, 0).getDate();
}

function jeAktualniDen(roku, mesic, den) {
  const aktDatum = new Date();
  return aktDatum.getFullYear() === roku && aktDatum.getMonth() === mesic && aktDatum.getDate() === den;
}

function zobrazUdalostiNaDen(td, rok, mesic, den) {
  const udalostiNaDen = udalosti.filter(udalost => {
    const udalostDatum = new Date(udalost.datum);
    return udalostDatum.getFullYear() === rok && udalostDatum.getMonth() === mesic && udalostDatum.getDate() === den;
  });

  udalostiNaDen.forEach(udalost => {
    const span = document.createElement('span');
    span.classList.add('udalost');
    span.textContent = udalostText(udalost);

    const udalostAkce = document.createElement('div');
    udalostAkce.classList.add('udalost-akce');

    const upravitButton = document.createElement('button');
    upravitButton.textContent = 'Upravit';
    upravitButton.onclick = function () {
      upravitUdalost(udalost);
    };

    const odstranitButton = document.createElement('button');
    odstranitButton.textContent = 'Odstranit';
    odstranitButton.onclick = function () {
      odstranitUdalost(udalost);
    };

    udalostAkce.appendChild(upravitButton);
    udalostAkce.appendChild(odstranitButton);

    span.appendChild(udalostAkce);
    td.appendChild(span);
  });
}
function jeAktualniDen(roku, mesic, den) {
  const aktDatum = new Date();
  return aktDatum.getFullYear() === roku && aktDatum.getMonth() === mesic && aktDatum.getDate() === den;
}
function zobrazUdalostiNaDen(td, rok, mesic, den) {
  const udalostiNaDen = udalosti.filter(udalost => {
    const udalostDatum = new Date(udalost.datum);
    return udalostDatum.getFullYear() === rok && udalostDatum.getMonth() === mesic && udalostDatum.getDate() === den;
  });

  udalostiNaDen.forEach(udalost => {
    const span = document.createElement('span');
    span.classList.add('udalost');
    span.textContent = udalostText(udalost);

    const udalostAkce = document.createElement('div');
    udalostAkce.classList.add('udalost-akce');

    const upravitButton = document.createElement('button');
    upravitButton.textContent = 'Upravit';
    upravitButton.onclick = function () {
      upravitUdalost(udalost);
    };

    const odstranitButton = document.createElement('button');
    odstranitButton.textContent = 'Odstranit';
    odstranitButton.onclick = function () {
      odstranitUdalost(udalost);
    };

    udalostAkce.appendChild(upravitButton);
    udalostAkce.appendChild(odstranitButton);

    span.appendChild(udalostAkce);
    td.appendChild(span);
  });
}

function udalostText(udalost) {
  return `${udalost.popis} - ${formatujDatum(udalost.datum)}`;
}

function formatujDatum(datum) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(datum).toLocaleDateString('cs-CZ', options);
}

function pridatUdalost() {
  const udalostInput = document.getElementById('udalostInput');
  const datumInput = document.getElementById('datumInput');
  const casInput = document.getElementById('casInput');

  const udalostText = udalostInput.value;
  const datumText = datumInput.value;
  const casText = casInput.value;

  if (udalostText && datumText && casText) {
    const novaUdalost = {
      datum: `${datumText} ${casText}`,
      popis: udalostText
    };

    udalosti.push(novaUdalost);
    zmenMesic();

    vymazatFormular();
  } else {
    alert('Vyplňte všechna pole formuláře.');
  }
}

function vymazatFormular() {
  const udalostInput = document.getElementById('udalostInput');
  const datumInput = document.getElementById('datumInput');
  const casInput = document.getElementById('casInput');

  udalostInput.value = '';
  datumInput.value = '';
  casInput.value = '';
}

function upravitUdalost(udalost) {
  const novyPopis = prompt('Zadejte nový popis události:', udalost.popis);
  const novyDatum = prompt('Zadejte nové datum a čas (YYYY-MM-DD HH:mm):', udalost.datum);

  if (novyPopis !== null && novyDatum !== null) {
    udalost.popis = novyPopis;
    udalost.datum = novyDatum;
    zmenMesic();
  }
}

function odstranitUdalost(udalost) {
  const potvrzeni = confirm('Opravdu chcete odstranit tuto událost?');

  if (potvrzeni) {
    const index = udalosti.indexOf(udalost);
    udalosti.splice(index, 1);
    zmenMesic();
  }
}


function zmenMesic() {
  const selectMesic = document.getElementById('mesiceSelect');
  const vybranyMesic = parseInt(selectMesic.value, 10);
  const selectRok = document.getElementById('rokySelect');
  const vybranyRok = parseInt(selectRok.value, 10);
  vygenerujKalendar(vybranyRok, vybranyMesic);
  aktualizujUdalosti();
}
function zmenRok() {
  const selectMesic = document.getElementById('mesiceSelect');
  const vybranyMesic = parseInt(selectMesic.value, 10);
  const selectRok = document.getElementById('rokySelect');
  const vybranyRok = parseInt(selectRok.value, 10);
  vygenerujKalendar(vybranyRok, vybranyMesic);
  aktualizujUdalosti();
}

function aktualizujUdalosti() {
  const udalostiContainer = document.getElementById('udalostiContainer');
  udalostiContainer.innerHTML = '';

  udalosti.forEach(udalost => {
    const div = document.createElement('div');
    div.classList.add('udalost');
    div.textContent = udalostText(udalost);

    const udalostAkce = document.createElement('div');
    udalostAkce.classList.add('udalost-akce');

    const upravitButton = document.createElement('button');
    upravitButton.textContent = 'Upravit';
    upravitButton.onclick = function () {
      upravitUdalost(udalost);
    };

    const odstranitButton = document.createElement('button');
    odstranitButton.textContent = 'Odstranit';
    odstranitButton.onclick = function () {
      odstranitUdalost(udalost);
    };

    udalostAkce.appendChild(upravitButton);
    udalostAkce.appendChild(odstranitButton);

    div.appendChild(udalostAkce);
    udalostiContainer.appendChild(div);
  });
}

const aktDatum = new Date();
vygenerujKalendar(aktDatum.getFullYear(), aktDatum.getMonth());

const selectRok = document.getElementById('rokySelect');
for (let rok = 2024; rok <= 2030; rok++) {
  const option = document.createElement('option');
  option.value = rok;
  option.textContent = rok;
  selectRok.appendChild(option);
}