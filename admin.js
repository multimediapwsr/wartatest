/* ===============================
   AMBIL ELEMEN FORM (WAJIB)
================================ */
const tanggal     = document.getElementById("tanggal");
const gerejawi    = document.getElementById("gerejawi");
const pdf         = document.getElementById("pdf");

const ibadah      = document.getElementById("ibadah");
const sekolah     = document.getElementById("sekolah");
const kelompok    = document.getElementById("kelompok");
const pemasukan   = document.getElementById("pemasukan");
const pengeluaran = document.getElementById("pengeluaran");
const pos         = document.getElementById("pos");
const persembahan = document.getElementById("persembahan");
const info        = document.getElementById("info");


/* ===============================
   HELPER
================================ */
function baris(cols) {
  const tr = document.createElement("tr");

  cols.forEach(v => {
    const td = document.createElement("td");

    if (v === "x") {
      const btn = document.createElement("button");
      btn.textContent = "❌";
      btn.onclick = () => tr.remove();
      td.appendChild(btn);
    } else {
      const input = document.createElement("input");
      input.placeholder = v;
      td.appendChild(input);
    }

    tr.appendChild(td);
  });

  return tr;
}

function ambil(table, keys) {
  return [...table.rows].slice(1).map(row => {
    const obj = {};
    keys.forEach((k, i) => {
      obj[k] = row.cells[i].children[0].value || "";
    });
    return obj;
  });
}


/* ===============================
   TAMBAH BARIS
================================ */
function tambahIbadah() {
  ibadah.appendChild(baris(["Jam","Tempat","Pelayan","Musik","Singer","Mazmur","x"]));
}
function tambahSekolah() {
  sekolah.appendChild(baris(["Jam","Kelas","Tempat","Pelayan","x"]));
}
function tambahKelompok() {
  kelompok.appendChild(baris(["Kelompok","Tempat","Pelayan","x"]));
}
function tambahPemasukan() {
  pemasukan.appendChild(baris(["Uraian","Nominal","x"]));
}
function tambahPengeluaran() {
  pengeluaran.appendChild(baris(["Uraian","Nominal","x"]));
}
function tambahPos() {
  pos.appendChild(baris(["Nama Pos","Saldo","x"]));
}
function tambahPersembahan() {
  persembahan.appendChild(baris(["Kelompok","L","P","Gereja","Bangunan","Pos","x"]));
}
function tambahInfo() {
  info.appendChild(baris(["Teks","Warna","x"]));
}


/* ===============================
   SIMPAN DATA (INI YANG ERROR TADI)
================================ */
function simpan() {
  const data = {
    meta: {
      tanggal: tanggal.value || "",
      gerejawi: gerejawi.value || "",
      pdf: pdf.value || ""
    },
    ibadah: ambil(ibadah, ["jam","tempat","pelayan","musik","singer","mazmur"]),
    sekolah: ambil(sekolah, ["jam","kelas","tempat","pelayan"]),
    kelompok: ambil(kelompok, ["nama","tempat","pelayan"]),
    pemasukan: ambil(pemasukan, ["uraian","nominal"]),
    pengeluaran: ambil(pengeluaran, ["uraian","nominal"]),
    pos: ambil(pos, ["nama","saldo"]),
    persembahan: ambil(persembahan, ["kelompok","l","p","gereja","bangunan","pos"]),
    info: ambil(info, ["teks","warna"])
  };

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "warta.json";
  a.click();
}
