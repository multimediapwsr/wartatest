const data = JSON.parse(localStorage.getItem('wartaData'));
const arsip = JSON.parse(localStorage.getItem('arsipWarta')) || [];
const ul = document.getElementById('arsipList');

arsip.forEach(a=>{
  ul.innerHTML += `
    <li>
      <a href="${a.link}" target="_blank">${a.judul}</a>
    </li>
  `;
});

if(data){
  document.querySelector('h1').innerText = data.namaGereja;
  document.getElementById('tglGerejawi').innerText = data.tglGerejawi;
  document.getElementById('warta').innerHTML = data.isiWarta;
}

function toggleSidebar(){
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('overlay');

  if(sb.style.left === '0px'){
    sb.style.left = '-200px';
    ov.style.display = 'none';
  }else{
    sb.style.left = '0px';
    ov.style.display = 'block';
  }
}

function openSidebar(){
  document.getElementById('sidebar').style.left = '0';
  document.getElementById('overlay').style.display = 'block';
}

function closeSidebar(){
  document.getElementById('sidebar').style.left = '-220px';
  document.getElementById('overlay').style.display = 'none';
}

function downloadWarta(){
  if(data?.linkWarta){
    window.open(data.linkWarta,'_blank');
  }else{
    alert('Link warta belum diatur admin');
  }
}


function showSection(id){

  // sembunyikan semua halaman
  document.querySelectorAll('.page').forEach(p=>{
    p.classList.remove('active');
  });

  // tampilkan halaman yang dipilih
  document.getElementById(id).classList.add('active');

  // tutup sidebar
  closeSidebar();
}

function hitungTotal(table){
  [...table.rows].slice(1).forEach(row=>{
    let sum = 0;
    row.querySelectorAll('input').forEach(i=>{
      sum += Number(i.value)||0;
    });
    row.querySelector('.total').innerText = sum;
  });
}

document.getElementById("tanggal").innerText =
  new Date().toLocaleDateString('id-ID',{weekday:'long', day:'numeric', month:'long', year:'numeric'});
