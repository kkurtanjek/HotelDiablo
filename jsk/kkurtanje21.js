
document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener('mouseout', (event) => {
    const slika = document.getElementById('interaktivna');
    const time = setTimeout(rotacija, 1000);

    function rotacija() {
      slika.style.transition = 'transform 0.5s';
      slika.style.transform = `rotate(300deg)`;
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const tekst = document.getElementById('tekst');
  
  document.addEventListener('click', () => {
    tekst.style.transition = 'transform 1s ease';
    tekst.style.transform = 'translateY(10px) rotate(100deg)';
    
    setTimeout(animacija, 1000);
  });

  function animacija() {
    tekst.style.transition = 'transform 0.5s ease';
    tekst.style.transform = 'translateY(0) rotate(0)';
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const mojaslika = document.getElementById('rotiranje');
  let smjer = 1;
  let pozicija = 0; 

  document.addEventListener('mouseover', () => {
    setTimeout(animacija, 1000);
  });

  function animacija() {
    pozicija += smjer * 25; 

    if (pozicija === 0 || pozicija === 100) {
      smjer *= -1; // promjena smjera
    }

    mojaslika.style.transform = `translateX(${pozicija}px)`;
    setTimeout(animacija, 500);
  }
});






if (window.innerWidth <= 480) {
  const vidljivi_stupci = [
    document.querySelector('#id1'),
    document.querySelector('#id2'),
    document.querySelector('#id3'),
    document.querySelector('#id4'),
    document.querySelector('#id5'),
    document.querySelector('#id6'),
    document.querySelector('#id7'),
    document.querySelector('#id8'),
	document.querySelector('#id9'),
	document.querySelector('#id10')
  ];
  vidljivi_stupci.forEach(stupac => {
    stupac.addEventListener('mouseover', () => {

      const red = stupac.parentNode;
      const celije = red.querySelectorAll('td');
      const informacije = document.createElement('div');

      celije.forEach(cell => {
        informacije.innerHTML += `${cell.textContent} `;
      });
      const informacijeTablice= document.querySelector('#informacijeTablice');
      informacijeTablice.innerHTML = '';
      informacijeTablice.appendChild(informacije);
    });
  });
}



  function showMessage(elementId, message) {
    const element = document.querySelector(`#${elementId}`);
    element.innerText = message;
    element.style.display = 'block';
  }
  
  let poruka;
  function prikaziPoruku(poruka){
    const divPoruka = document.createElement("div");
    divPoruka.textContent = poruka;
    divPoruka.style.color = 'black';
    divPoruka.style.background = 'lightblue';
    divPoruka.style.position = 'fixed';
    divPoruka.style.right = '50%';
    divPoruka.style.top = '50%';
    document.body.appendChild(divPoruka);
    
    divPoruka.addEventListener('click', (event) => {
      event.target.remove();
    });
  }

  const form = document.getElementById('formaKontakt');
  const gumbPosalji = document.getElementById('posalji');

  form.addEventListener('focusout',(event)=>{
    const znakovi = /[!#$<>?]/g;
    const predmetInput = document.getElementById('predmet');
    const predmetVrijednost = predmetInput.value;
    const porukaInput = document.getElementById('poruka');
    const porukaVrijednost = porukaInput.value;
  
    if (znakovi.test(predmetVrijednost)) {
      event.preventDefault(); 
      predmetInput.classList.add("prazno");
      prikaziPoruku("Predmet upita ne smije sadržavati specijalne znakove!");
    } else {
      predmetInput.classList.remove("prazno");
    }
    if (porukaVrijednost.length <10 || porukaVrijednost.length>1000 || znakovi.test(porukaVrijednost)) {
      event.preventDefault(); 
      porukaInput.classList.add("prazno");
      prikaziPoruku("Poruka ne smije sadržavati manje od 10 i više od 1000 znakova!");
    } else {
      porukaInput.classList.remove("prazno");
    }
  });
  
  gumbPosalji.addEventListener('click',(event)=>{
  const predmetInput = document.getElementById('predmet');
  const porukaInput = document.getElementById('poruka');
  const radioInputs = document.querySelectorAll('input[type=radio]');
  radio.style.color = 'red';
  
    if (predmetInput.value === '') {
      event.preventDefault(); 
      predmetInput.classList.add("prazno");
      prikaziPoruku("Predmet upita nije upisan!");
    } else {
      predmetInput.classList.remove("prazno");
    }

    let odabran = false;
    radioInputs.forEach((input) => {
      if (input.checked) {
        odabran = true;
      } 
    });
    
    if (!odabran) {
      event.preventDefault(); 
      prikaziPoruku("Vrsta upita nije odabrana!");
      
      
    }

    if (porukaInput.value==='') {
      event.preventDefault(); 
      porukaInput.classList.add("prazno");
      prikaziPoruku("Poruka nije upisana!");
    } else {
      porukaInput.classList.remove("prazno");
    }
});


const formaRezervacije = document.getElementById('forma1');
const gumbRezerviraj = document.getElementById('gumbRezerviraj');


gumbRezerviraj.addEventListener('click', (event) => {
  const ime = document.getElementById('ime');
  const prezime = document.getElementById('prezime');
  const email = document.getElementById('email');
  const broj = document.getElementById('broj');
  const br_osoba = document.getElementById('br_osoba');
  const selectVrstaSobe = document.getElementById("vrsta_sobe");
  const odjavaDatum = document.getElementById('odjava');
 if (ime.value.length == 0) {
      event.preventDefault(); 
      ime.classList.add("prazno");
      prikaziPoruku("Ime nije upisano!");
    } else {
      ime.classList.remove("prazno");
    }

  if (prezime.value === '') {
    event.preventDefault();
    prezime.classList.add("prazno");
    prikaziPoruku("Prezime nije upisano!");
  } else {
    prezime.classList.remove("prazno");
  }

  if (email.value === '') {
    event.preventDefault();
    email.classList.add("prazno");
    prikaziPoruku("Email nije upisan!");
  } else {
    email.classList.remove("prazno");
  }

  if (broj.value === '') {
    event.preventDefault();
    broj.classList.add("prazno");
    prikaziPoruku("Kontakt broj nije upisan!");
  } else {
    broj.classList.remove("prazno");
  }

  if (br_osoba.value === '') {
    event.preventDefault();
    br_osoba.classList.add("prazno");
    prikaziPoruku("Broj osoba nije odabrano!");
  } else {
    br_osoba.classList.remove("prazno");
  }

  if (selectVrstaSobe.value===''){
    event.preventDefault();
    selectVrstaSobe.classList.add("prazno");
    prikaziPoruku("Vrsta osobe nije odabrana!");
  } else {
    selectVrstaSobe.classList.remove("prazno");
  }

  if (odjavaDatum.value===''){
    event.preventDefault();
    odjavaDatum.classList.add("prazno");
    prikaziPoruku("Datum odjave nije odabran!");
  } else {
    odjavaDatum.classList.remove("prazno");
  }


  if (prijavaDatum.value===''){
    event.preventDefault();
    prijavaDatum.classList.add("prazno");
    prikaziPoruku("Datum prijave nije odabran!");
  } else {
    prijavaDatum.classList.remove("prazno");
  }


  if (odabirvrijeme.value===''){
    event.preventDefault();
    odabirvrijeme.classList.add("prazno");
    prikaziPoruku("Vrijeme prijave nije odabrano!");
  } else {
    odabirvrijeme.classList.remove("prazno");
  }
});





formaRezervacije.addEventListener('focusout',(event)=>{
  const znakovi = /[!#$<>?]/g;
  const ime = document.getElementById('ime');
  const prezime = document.getElementById('prezime');

  if (znakovi.test(ime.value)) {
    event.preventDefault(); 
    ime.classList.add("prazno");
    prikaziPoruku("Ime ne smije sadržavati specijalne znakove!");
  } else {
    ime.classList.remove("prazno");
  }
  if (znakovi.test(prezime.value)) {
    event.preventDefault(); 
    prezime.classList.add("prazno");
    prikaziPoruku("Prezime ne smije sadržavati specijalne znakove!");
  } else {
    prezime.classList.remove("prazno");
  }
});



const prijavaDatum = document.getElementById('prijava');
const odabirvrijeme = document.getElementById('vrijeme');
odabirvrijeme.disabled = true;

prijavaDatum.addEventListener("focusout", (event) => {
  const odabrani_datum = new Date(prijavaDatum.value); 
  const danasnji_datum = new Date();
  const trenutno_vrijeme = new Date().toLocaleTimeString('hr-HR', {hour: '2-digit', minute:'2-digit'});



  if (odabrani_datum.getDate() === danasnji_datum.getDate() &&
        odabrani_datum.getMonth() === danasnji_datum.getMonth() &&
        odabrani_datum.getFullYear() === danasnji_datum.getFullYear()) {
          odabirvrijeme.value=trenutno_vrijeme;

    }

  if (odabrani_datum < danasnji_datum.setHours(0, 0, 0, 0)) {
    event.preventDefault();
    prijavaDatum.style.borderColor = "red";
    prikaziPoruku("Odabrani datum je u prošlosti!");
    odabirvrijeme.disabled = true;
  } 

  else {
    odabirvrijeme.disabled = false;
    prijavaDatum.style.borderColor="black";
  }
});

odabirvrijeme.addEventListener("focusout", (event) => {
  const odabrani_datum = new Date(prijavaDatum.value); 
  const danasnji_datum = new Date();
  const trenutno_vrijeme = new Date().toLocaleTimeString('hr-HR', {hour: '2-digit', minute:'2-digit'});
  const odabrano_vrijeme = odabirvrijeme.value;

  if (odabrani_datum.getDate() === danasnji_datum.getDate() &&
      odabrani_datum.getMonth() === danasnji_datum.getMonth() &&
      odabrani_datum.getFullYear() === danasnji_datum.getFullYear() &&
      odabrano_vrijeme < trenutno_vrijeme) {
    odabirvrijeme.value = trenutno_vrijeme;
  }
});

