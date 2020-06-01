import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mapa';
  file: any;

  fileChanged(e) {
    this.file = e.target.files[0];
  }

  processar() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      let resultado = '';
      resultado = fileReader.result as string;
      resultado = resultado.replace(/['"]+/g, '');
      const lines = resultado.split('\n');
      let stringFinal = '';
      for (let i = 0; i < lines.length - 1; i++) {
        if (i > 1) {
          const linhaDividida = lines[i].split(',');
          const parte1 = linhaDividida[0].trim() + linhaDividida[1];
          const parte2 = linhaDividida[2];
          const parte3 = linhaDividida[3];
          const parte4 = linhaDividida[4];
          const parte5 = linhaDividida[5];
          const endereco = 'Endereco do Beneficiario';
          let novaLinha = `{D} I${this.truncateString(parte1, 35).padEnd(35, ' ')}${endereco.padEnd(35, ' ')}${parte2.padEnd(35, ' ')}${parte2.padEnd(35, ' ')}${parte4.padEnd(35, ' ')}${parte3.padEnd(24, ' ')}${parte5.padStart(10, '0')}`;
          novaLinha = novaLinha.replace('\r', '');
          novaLinha = novaLinha.padEnd(300, ' ');
          novaLinha = novaLinha + '\n';
          stringFinal = stringFinal + novaLinha;
        }
      }
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stringFinal));
      element.setAttribute('download', 'arquivo.txt');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    };
    fileReader.readAsText(this.file);
  }

  truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num);
  }
}
