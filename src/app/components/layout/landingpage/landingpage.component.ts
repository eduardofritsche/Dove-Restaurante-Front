import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements AfterViewInit {

  // se quiser apontar para outra rota depois:
  loginPath = '/login-cliente';

  ngAfterViewInit(): void {
    // ====== Galeria (localStorage) ======
    const LS_KEY = 'dove_lp_images';
    const grid = document.getElementById('grid') as HTMLElement;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const btnAdd = document.getElementById('btnAdd') as HTMLButtonElement;
    const btnClear = document.getElementById('btnClear') as HTMLButtonElement;
    const drop = document.getElementById('dropzone') as HTMLElement;
    const tpl = document.getElementById('tplCard') as HTMLTemplateElement;
    const modalEl = document.getElementById('viewer') as HTMLElement;
    const viewerImg = document.getElementById('viewerImg') as HTMLImageElement;

    // @ts-ignore: bootstrap é global (adicionado via angular.json)
    const modal = new (window as any).bootstrap.Modal(modalEl);

    (document.getElementById('year') as HTMLElement).textContent = String(new Date().getFullYear());

    const load = () => {
      try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
      catch { return []; }
    };
    const save = (list: any[]) => localStorage.setItem(LS_KEY, JSON.stringify(list));

    const addCard = (data: string, when: number) => {
      const node = (tpl as any).content.cloneNode(true) as HTMLElement;
      const img = node.querySelector('img') as HTMLImageElement;
      const whenEl = node.querySelector('.when') as HTMLElement;
      img.src = data;
      img.addEventListener('click', () => { viewerImg.src = data; modal.show(); });
      whenEl.textContent = new Date(when).toLocaleString('pt-BR');
      grid.appendChild(node);
    };

    const render = () => {
      grid.innerHTML = '';
      const items = load();
      items.forEach((i: any) => addCard(i.data, i.when));
      if (items.length === 0) {
        grid.innerHTML = '<div class="col"><div class="text-center text-secondary py-5">Nenhuma imagem adicionada ainda.</div></div>';
      }
    };

    const filesToDataURLs = async (files: FileList) => {
      const tasks = Array.from(files).map(f => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(f);
      }));
      return Promise.all(tasks) as Promise<string[]>;
    };

    const handleFiles = async (files?: FileList | null) => {
      if (!files || files.length === 0) return;
      const urls = await filesToDataURLs(files);
      const list = load();
      const now = Date.now();
      urls.forEach(u => list.push({ data: u, when: now }));
      save(list);
      render();
    };

    btnAdd.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e: any) => handleFiles(e.target.files));

    ['dragenter','dragover'].forEach(ev =>
      drop.addEventListener(ev, (e) => { e.preventDefault(); e.stopPropagation(); drop.classList.add('dragover'); })
    );
    ['dragleave','drop'].forEach(ev =>
      drop.addEventListener(ev, (e) => { e.preventDefault(); e.stopPropagation(); drop.classList.remove('dragover'); })
    );
    drop.addEventListener('drop', (e: any) => handleFiles(e.dataTransfer.files));

    btnClear.addEventListener('click', () => {
      if (confirm('Remover todas as imagens da galeria deste navegador?')) {
        localStorage.removeItem(LS_KEY);
        render();
      }
    });

    render();
  }
}
