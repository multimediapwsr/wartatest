fetch("data/warta.json")
  .then(res => res.json())
  .then(data => {

    /* =========================
       INFO UMUM
    ========================= */
    const tgl = document.getElementById("tanggal");
    const grj = document.getElementById("gerejawi");
    const pdf = document.getElementById("btnPdf");

    if (tgl) tgl.innerText = data.meta?.tanggal || "";
    if (grj) grj.innerText = data.meta?.gerejawi || "";
    if (pdf) pdf.href = data.meta?.pdf || "#";


    /* =========================
       PELAYAN IBADAH MINGGU
    ========================= */
    const ibadahCard = document.querySelector(".card.blue");
    if (ibadahCard && data.ibadah) {
      ibadahCard.innerHTML = `<h2>Pelayan Ibadah Minggu</h2>`;

      data.ibadah.forEach(minggu => {
        let html = `<h4>${minggu.tanggal || ""}</h4>
        <table>
          <tr>
            <th>Jam</th><th>Tempat</th><th>Pelayan</th>
            <th>Musik</th><th>Singer</th><th>Pendarasan Mazmur</th>
          </tr>`;

        minggu.jadwal.forEach(j => {
          html += `<tr>
            <td>${j.jam || ""}</td>
            <td>${j.tempat || ""}</td>
            <td>${j.pelayan || ""}</td>
            <td>${j.musik || ""}</td>
            <td>${j.singer || ""}</td>
            <td>${j.mazmur || ""}</td>
          </tr>`;
        });

        html += `</table>`;
        ibadahCard.innerHTML += html;
      });
    }


    /* =========================
       SEKOLAH MINGGU
    ========================= */
    const sekolahCard = document.querySelector(".card.green");
    if (sekolahCard && data.sekolah) {
      sekolahCard.innerHTML = `<h2>Pelayan Sekolah Minggu</h2>`;

      data.sekolah.forEach(m => {
        let html = `<h4>${m.tanggal || ""}</h4>
        <table>
          <tr>
            <th>Jam</th><th>Kelas</th><th>Tempat</th><th>Pelayan</th>
          </tr>`;

        m.kelas.forEach(k => {
          html += `<tr>
            <td>${k.jam || ""}</td>
            <td>${k.kelas || ""}</td>
            <td>${k.tempat || ""}</td>
            <td>${k.pelayan || ""}</td>
          </tr>`;
        });

        html += `</table>`;
        sekolahCard.innerHTML += html;
      });
    }


    /* =========================
       JADWAL IBADAH KELOMPOK
    ========================= */
    const kelompokCard = document.querySelector(".card.orange");
    if (kelompokCard && data.kelompok) {
      let html = `<h2>Jadwal Ibadah Kelompok</h2>
      <table>
        <tr>
          <th>Kelompok</th><th>Tempat Ibadah</th><th>Pelayan</th>
        </tr>`;

      data.kelompok.forEach(k => {
        html += `<tr>
          <td>${k.nama}</td>
          <td>${k.tempat}</td>
          <td>${k.pelayan}</td>
        </tr>`;
      });

      html += `</table>`;
      kelompokCard.innerHTML = html;
    }


    /* =========================
       KEUANGAN PEMASUKAN
    ========================= */
    const pemasukanCard = document.querySelectorAll(".card.purple")[0];
    if (pemasukanCard && data.pemasukan) {
      let total = 0;
      let html = `<h2>Keuangan Gereja - Pemasukan</h2>
      <table>
        <tr><th>Uraian</th><th>Nominal (Rp)</th></tr>`;

      data.pemasukan.forEach(p => {
        total += Number(p.nominal || 0);
        html += `<tr>
          <td>${p.uraian}</td>
          <td>${formatRp(p.nominal)}</td>
        </tr>`;
      });

      html += `<tr class="total">
        <td>TOTAL</td><td>${formatRp(total)}</td>
      </tr></table>`;

      pemasukanCard.innerHTML = html;
    }


    /* =========================
       KEUANGAN PENGELUARAN
    ========================= */
    const pengeluaranCard = document.querySelectorAll(".card.purple")[1];
    if (pengeluaranCard && data.pengeluaran) {
      let total = 0;
      let html = `<h2>Keuangan Gereja - Pengeluaran</h2>
      <table>
        <tr><th>Uraian</th><th>Nominal (Rp)</th></tr>`;

      data.pengeluaran.forEach(p => {
        total += Number(p.nominal || 0);
        html += `<tr>
          <td>${p.uraian}</td>
          <td>${formatRp(p.nominal)}</td>
        </tr>`;
      });

      html += `<tr class="total">
        <td>TOTAL</td><td>${formatRp(total)}</td>
      </tr></table>`;

      pengeluaranCard.innerHTML = html;
    }


    /* =========================
       POS KEUANGAN GEREJA
    ========================= */
    const posCard = document.querySelectorAll(".card.orange")[1];
    if (posCard && data.pos) {
      let html = `<h2>Pos Keuangan Gereja</h2>
      <table>
        <tr><th>Nama Pos</th><th>Saldo</th></tr>`;

      data.pos.forEach(p => {
        html += `<tr>
          <td>${p.nama}</td>
          <td>${formatRp(p.saldo)}</td>
        </tr>`;
      });

      html += `</table>`;
      posCard.innerHTML = html;
    }


    /* =========================
       PERSEMBAHAN IBADAH KELUARGA
    ========================= */
    const persembahanCard = document.querySelector(".card.orange:last-of-type");
    if (persembahanCard && data.persembahan) {
      let totalL=0, totalP=0, tG=0, tB=0, tPos=0;

      let html = `<h2>Rincian Persembahan Ibadah Keluarga</h2>
      <table>
        <tr>
          <th>Kelompok</th><th>Hadir L</th><th>Hadir P</th>
          <th>Gereja</th><th>Bangunan</th><th>Pos</th>
        </tr>`;

      data.persembahan.forEach(p => {
        totalL+=+p.l; totalP+=+p.p;
        tG+=+p.gereja; tB+=+p.bangunan; tPos+=+p.pos;

        html += `<tr>
          <td>${p.kelompok}</td>
          <td>${p.l}</td>
          <td>${p.p}</td>
          <td>${formatRp(p.gereja)}</td>
          <td>${formatRp(p.bangunan)}</td>
          <td>${formatRp(p.pos)}</td>
        </tr>`;
      });

      html += `<tr class="total">
        <td>TOTAL</td><td>${totalL}</td><td>${totalP}</td>
        <td>${formatRp(tG)}</td>
        <td>${formatRp(tB)}</td>
        <td>${formatRp(tPos)}</td>
      </tr></table>`;

      persembahanCard.innerHTML = html;
    }


    /* =========================
       INFORMASI GEREJA
    ========================= */
    const infoWrap = document.querySelector(".info-wrapper");
    if (infoWrap && data.info) {
      infoWrap.innerHTML = "";
      data.info.forEach(i => {
        infoWrap.innerHTML += `
          <div class="info-card ${i.warna}">
            📢 ${i.teks}
          </div>`;
      });
    }

  });


/* =========================
   FORMAT RUPIAH
========================= */
function formatRp(angka){
  return "Rp " + Number(angka||0).toLocaleString("id-ID");
}
