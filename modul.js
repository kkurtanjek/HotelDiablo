const fs = require('fs');
const bodyParser = require('body-parser');

class Modul {
  constructor(filePath) {
    this.filePath = filePath;
  }

citanjePodataka() {
  try {
    const podaci = fs.readFileSync(this.filePath, 'utf-8');
    const redovi = podaci.split('\n');

    if (redovi[redovi.length - 1] === '') {
      redovi.pop();
    }

    const varijable = ['ime', 'prezime', 'email', 'broj', 'brojOsoba', 'vrstaSobe', 'datumDolaska', 'datumOdjave', 'vrijemePrijave'];

    const formatiraniPodaci = redovi.map((red) => {
      const polja = red.split(';');

      const formatiranoPolje = polja.map((polje, index) => {
        const varijabla = varijable[index];
        return `${varijabla}: ${polje.replace(/"/g, '')}`;
      });

      return formatiranoPolje;
    });

    return JSON.stringify(formatiraniPodaci);
  } catch (error) {
    console.error('Greška:', error);
    return [];
  }
}


upisPodataka(podaci) {
  try {
    const noviZapis = Object.values(podaci).join(';');
    const csvPodaci = `"${noviZapis}"\n`;

    const stariSadrzaj = fs.readFileSync(this.filePath, 'utf-8');
    const noviSadrzaj = stariSadrzaj + csvPodaci;

    fs.writeFileSync(this.filePath, noviSadrzaj, 'utf-8');
  } catch (error) {
    console.error('Greška kod upisa:', error);
  }
}




brisanjePodataka(id) {
  try {
    const podaci = fs.readFileSync(this.filePath, 'utf-8');
    const redovi = podaci.trim().split('\n');
    if (redovi[redovi.length - 1] === '') {
      redovi.pop();
    }

    redovi.splice(id - 1, 1);

    const csvPodaci = redovi.join('\n');
    fs.writeFileSync(this.filePath, csvPodaci, 'utf-8');

    console.log('Podaci su uspješno obrisani.');
  } catch (error) {
    console.error('Greška kod brisanja:', error);
  }
}





}

module.exports = Modul;
