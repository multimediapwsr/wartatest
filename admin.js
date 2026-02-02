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

function tambahArsip(){
  arsip.push({
    judul: arsipJudul.value,
    link: arsipLink.value
  });
  arsipJudul.value = '';
  arsipLink.value = '';
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
