let arsip = JSON.parse(localStorage.getItem('arsipWarta')) || [];

function simpanData(){
  const data = {
    namaGereja: namaGereja.value,
    tglGerejawi: tglGerejawi.value,
    linkWarta: linkWarta.value,
    isiWarta: isiWarta.value
  };

  localStorage.setItem('wartaData', JSON.stringify(data));
  localStorage.setItem('arsipWarta', JSON.stringify(arsip));

  alert('Data warta berhasil disimpan');
}
function normalizeUrl(url){
  if(!url) return '';

  if(
    !url.startsWith('http://') &&
    !url.startsWith('https://')
  ){
    return 'https://' + url;
  }
  return url;
}

function tambahArsip(){
  arsip.push({
    judul: arsipJudul.value,
    link: normalizeUrl(arsipLink.value),
    bulan: arsipBulan.value   // contoh: 2026-02
  });

  arsipJudul.value = '';
  arsipLink.value = '';
  arsipBulan.value = '';
  renderArsip();
}

function renderArsip(){
  listArsip.innerHTML = '';
  arsip.forEach((a,i)=>{
    listArsip.innerHTML += `
      <li>
        ${a.judul}
        <button onclick="hapusArsip(${i})">❌</button>
      </li>
    `;
  });
}

function hapusArsip(i){
  arsip.splice(i,1);
  renderArsip();
}

renderArsip();
