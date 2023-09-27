const http = require('http');
const hostname = 'localhost';
const port = 12406;
const express = require('express');
const server = express();
const path = require('path');
const datoteke = require("fs");
const Modul = require('./modul.js');
const filePath = "podaci/rezervacije.csv";
const modul = new Modul(filePath);

const prijeTablicePath = path.join(__dirname, 'podaci', 'prijeTablice.txt');
const poslijeTablicePath = path.join(__dirname, 'podaci', 'poslijeTablice.txt');
const cjenikPath = path.join(__dirname,'podaci', 'cjenik.json');


const podaciRezervacije = new Modul('./podaci/rezervacije.csv');
const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('/api/rezervacije', (req, res) => {
  res.type('json');
  res.status(200).send(podaciRezervacije.citanjePodataka());
});


server.post('/api/rezervacije', (req, res) => {
  res.type('json');
  console.log(req.body);
  const podaci = req.body;
  
  if (!podaci.ime || !podaci.prezime || !podaci.email || !podaci.broj || !podaci.br_osoba || !podaci.vrsta_sobe || !podaci.prijava || !podaci.odjava || !podaci.vrijeme) {
    res.status(417).json({ greska: 'nevaljani podaci' });
    return;
  }
  
  const noviZapis = `${podaci.ime};${podaci.prezime};${podaci.email};${podaci.broj};${podaci.br_osoba};${podaci.vrsta_sobe};${podaci.prijava};${podaci.odjava};${podaci.vrijeme}`;
  
  podaciRezervacije.upisPodataka([noviZapis]);
  
  const dodano = podaciRezervacije.citanjePodataka();
  if (dodano.length > 0) {
    res.status(200).json({poruka: 'podaci dodani'});
  } else {
    res.status(417).json({ greska: 'nevaljani podaci' });
  }
});



server.put('/api/rezervacije', (req, res) => {
   res.status(501).json({ greska: 'metoda nije implementirana' });
});

server.delete('/api/rezervacije', (req, res) => {
  res.status(501).json({ greska: 'metoda nije implementirana' });
});


server.get('/api/rezervacije/:id', (req, res) => {
  res.type('json');
  const id = parseInt(req.params.id);
  const podaci = JSON.parse(podaciRezervacije.citanjePodataka());

  if (id >= 1 && id <= podaci.length) {
    const rezervacija = podaci[id - 1];
    res.status(200).json(rezervacija);
  } else {
    res.status(404).json({ greska: 'nema resursa' });
  }
});


server.post('/api/rezervacije/:id', (req, res) => {
  res.status(405).json({ greska: 'metoda nije dopuštena' });
});

server.delete('/api/rezervacije/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const modul = new Modul(filePath);
  const podaci = JSON.parse(modul.citanjePodataka()); 

  const redakIndex = id - 1;

  if (redakIndex < 0 || redakIndex >= podaci.length) {
    res.status(417).json({ greska: 'nevaljani podaci' });
    return;
  }

  const redak = podaci[redakIndex];

  if (redak.every((elem) => elem.trim() === '')) {
    res.status(417).json({ greska: 'nevaljani podaci' });
    return;
  }

  modul.brisanjePodataka(id);
  res.status(200).json({ poruka: 'podaci obrisani' });
});


server.use(express.static('html'));
server.use('/css', express.static(path.join(__dirname, 'css')));
server.use('/dokumenti', express.static(path.join(__dirname, 'dokumenti')));
server.use('/jsk', express.static(path.join(__dirname, 'jsk')));
server.use(express.static('dokumentacija'));
server.use('/podaci', express.static(path.join(__dirname, 'podaci')));


server.get('/', (zahtjev, odgovor) => {
  odgovor.send('Moj NodeJS express server!');
});

server.get('/', (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(__dirname,'html/index.html'));
});

server.get('/dokumentacija', (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(__dirname,'html/dokumentacija.html'));
});

server.get('/multimedija', (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(__dirname, 'multimedija'));
});

server.get('/autor', (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(__dirname, 'dokumentacija/autor.html'));
});

server.get('/autor', (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(__dirname, 'dokumentacija/dokumentacija.html'));
});

server.get('/slike', (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(__dirname, 'dokumentacija', 'slike'));
});

server.get('/cjenik', (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(__dirname,'html/cjenik.html'));
});


server.get('/hotel', (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(__dirname, 'html/hotel.html'));
});

server.get('/onama', (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(__dirname,'html/onama.html'));
});

server.get('/ponuda', (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(__dirname,'html/ponuda.html'));
});

server.get('/ponuda2', (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(__dirname,'html/ponuda2.html'));
});

server.get('/ponuda3', (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(__dirname,'html/ponuda3.html'));
});

server.get('/javascript', (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(__dirname, 'jsk/kkurtanje21.js'));
});



const cjenikPodaci = datoteke.readFileSync(cjenikPath, 'utf-8');
const cjenik = JSON.parse(cjenikPodaci);
const prijeTablice = datoteke.readFileSync(prijeTablicePath, 'utf-8');
function generirajTablicu(cjenik) {
  let tablicaHTML = '<table class="cjenik">';
  tablicaHTML += '<caption>Ponuda hotela</caption>';
  tablicaHTML += '<tbody>';
  tablicaHTML += '<tr>';
  tablicaHTML += '<th id="1" scope="col">Vrsta sobe</th>';
  tablicaHTML += '<th scope="col">Slobodni termin</th>';
  tablicaHTML += '<th scope="col">Noćenje + doručak</th>';
  tablicaHTML += '<th scope="col">Cijena noćenja</th>';
  tablicaHTML += '</tr>';

  let brojac = 1; 

  cjenik.forEach(function(red) {
    tablicaHTML += '<tr>';
    tablicaHTML += '<td id="id' + brojac + '">' + red.vrstaSobe + '</td>'; 
    tablicaHTML += '<td>' + red.slobodniTermin + '</td>';
    tablicaHTML += '<td>' + red.nocenjeDorucak + '</td>';
    tablicaHTML += '<td>' + red.cijenaNocenja + '</td>';
    tablicaHTML += '</tr>';
    brojac++; 
  });

  tablicaHTML += '</tbody>';
  tablicaHTML += '</table>';

  return tablicaHTML;
}


const tablica = generirajTablicu(cjenik);

server.get('/dinamicna', (zahtjev, odgovor) => {

  const poslijeTablice = datoteke.readFileSync(poslijeTablicePath, 'utf-8');
  
  const generiraniHTML = `
    ${prijeTablice}
    ${tablica}
    ${poslijeTablice}
    <script>
      if (window.innerWidth <= 480) {
        const vidljivi_stupci = [
          document.querySelector('#id1'),
          document.querySelector('#id2'),
          document.querySelector('#id3'),
          document.querySelector('#id4'),
          document.querySelector('#id5'),
          document.querySelector('#id6'),
          document.querySelector('#id7'),
          document.querySelector('#id8')
        ];
        vidljivi_stupci.forEach(stupac => {
          stupac.addEventListener('mouseover', () => {
            const red = stupac.parentNode;
            const celije = red.querySelectorAll('td');
            const informacije = document.createElement('div');

            celije.forEach(cell => {
              informacije.innerHTML += \`\${cell.textContent} \`;
            });

            const informacijeTablice = document.querySelector('#informacijeTablice');
            if (informacijeTablice) {
              informacijeTablice.innerHTML = '';
              informacijeTablice.appendChild(informacije);
            }
          });
        });
      }
    </script>
  `;

  odgovor.send(generiraniHTML);
});


server.use((zahtjev, odgovor) => {
  odgovor.status(404).send('<a href="/">stranica ne postoji</a>');
});

server.listen(port, hostname, () => {
  console.log(`Server pokrenut na http://${hostname}:${port}`);
});
