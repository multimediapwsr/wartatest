let arsip = JSON.parse(localStorage.getItem('arsipWarta')) || [];

function baris(cols) {
  const tr = document.createElement("tr");
  cols.forEach(v => {
    const td = document.createElement("td");
    if (v === "x") {
      const b = document.createElement("button");
      b.textContent = "❌";
      b.onclick = () => tr.remove();
      td.appendChild(b);
    } else {
      const i = document.createElement("input");
      i.placeholder = v;
      td.appendChild(i);
    }
    tr.appendChild(td);
  });
  return tr;
}

function tambahIbadah(){ ibadah.appendChild(baris(["Jam","Tempat","Pelayan","Musik","Singer","Mazmur","x"])) }
function tambahSekolah(){ sekolah.appendChild(baris(["Jam","Kelas","Tempat","Pelayan","x"])) }
function tambahKelompok(){ kelompok.appendChild(baris(["Kelompok","Tempat","Pelayan","x"])) }
function tambahPemasukan(){ pemasukan.appendChild(baris(["Uraian","Nominal","x"])) }
function tambahPengeluaran(){ pengeluaran.appendChild(baris(["Uraian","Nominal","x"])) }
function tambahPos(){ pos.appendChild(baris(["Nama Pos","Saldo","x"])) }
function tambahPersembahan(){ persembahan.appendChild(baris(["Kelompok","L","P","Gereja","Bangunan","Pos","x"])) }
function tambahInfo(){ info.appendChild(baris(["Teks","Warna","x"])) }

function ambil(table, keys){
  return [...table.rows].slice(1).map(r=>{
    const obj={};
    keys.forEach((k,i)=> obj[k]=r.cells[i].children[0].value);
    return obj;
  });
}

function simpan(){
  const data={
    meta:{
      tanggal:tanggal.value,
      gerejawi:gerejawi.value,
      pdf:pdf.value
    },
    ibadah:ambil(ibadah,["jam","tempat","pelayan","musik","singer","mazmur"]),
    sekolah:ambil(sekolah,["jam","kelas","tempat","pelayan"]),
    kelompok:ambil(kelompok,["nama","tempat","pelayan"]),
    pemasukan:ambil(pemasukan,["uraian","nominal"]),
    pengeluaran:ambil(pengeluaran,["uraian","nominal"]),
    pos:ambil(pos,["nama","saldo"]),
    persembahan:ambil(persembahan,["kelompok","l","p","gereja","bangunan","pos"]),
    info:ambil(info,["teks","warna"])
  };

  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="warta.json";
  a.click();
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
