import { useState, useEffect } from "react";

function App() {
  const [barang, setBarang] = useState([]);

  // State Form
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("");
  const [stok, setStok] = useState("");

  // --- STATE BARU: UNTUK MODE EDIT ---
  // Kalau null = Mode Tambah. Kalau ada angka = Mode Edit.
  const [editId, setEditId] = useState(null);

  const endpoint = "http://https://belajar-backend-nu.vercel.app/";

  // 1. FUNGSI AMBIL DATA (Sama kayak sebelumnya)
  async function ambilData() {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setBarang(data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    }
  }

  // 2. FUNGSI SIMPAN (BISA POST ATAU PUT)
  async function simpanData(e) {
    e.preventDefault();

    const dataKirim = {
      nama_barang: nama,
      kategori: kategori,
      harga: harga,
      stok: stok,
    };

    try {
      if (editId === null) {
        // --- LOGIKA TAMBAH BARU (POST) ---
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataKirim),
        });
      } else {
        // --- LOGIKA UPDATE (PUT) ---
        // Kirim ke alamat spesifik: http://localhost:3000/barang/5
        await fetch(`${endpoint}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataKirim),
        });
      }

      // Reset Form ke awal
      resetForm();
      ambilData();
    } catch (error) {
      console.error("Error simpan data:", error);
    }
  }

  // 3. FUNGSI HAPUS (DELETE)
  async function hapusData(id) {
    if (confirm("Yakin mau hapus?")) {
      await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      ambilData();
    }
  }

  // 4. FUNGSI PERSIAPAN EDIT (Mengisi form dengan data lama)
  function aktifkanEdit(item) {
    setEditId(item.id); // Tandai kita lagi edit ID ini
    setNama(item.nama_barang);
    setKategori(item.kategori);
    setHarga(item.harga);
    setStok(item.stok);
  }

  // 5. FUNGSI BATAL EDIT
  function resetForm() {
    setEditId(null);
    setNama("");
    setKategori("");
    setHarga("");
    setStok("");
  }

  useEffect(() => {
    ambilData();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h1>Gudang React JS 🚀</h1>

      {/* Form Input */}
      <div
        style={{
          background: "#f0f0f0",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        {/* Judul Form berubah dinamis */}
        <h3>{editId ? "Edit Barang" : "Tambah Barang Baru"}</h3>

        <form onSubmit={simpanData}>
          <input
            type="text"
            placeholder="Nama Barang"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={inputStyle}
            required
          />
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            style={inputStyle}
            required
          >
            <option value="">Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
          <input
            type="number"
            placeholder="Harga"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="number"
            placeholder="Stok"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
            style={inputStyle}
            required
          />

          <div style={{ marginTop: "10px" }}>
            <button type="submit" style={btnBlue}>
              {editId ? "UPDATE" : "SIMPAN"}
            </button>

            {/* Tombol Batal hanya muncul pas lagi Edit */}
            {editId && (
              <button type="button" onClick={resetForm} style={btnGrey}>
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Daftar Barang */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {barang.map((item) => (
          <li key={item.id} style={cardStyle}>
            <div>
              <strong>{item.nama_barang}</strong> <br />
              <small>
                Rp {item.harga} | Stok: {item.stok} | Kategori: {item.kategori}
              </small>
            </div>
            <div>
              <button onClick={() => aktifkanEdit(item)} style={btnYellow}>
                Edit
              </button>
              <button onClick={() => hapusData(item.id)} style={btnRed}>
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Styling CSS in JS biar rapi (Bonus)
const inputStyle = {
  padding: "8px",
  marginRight: "5px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "28%",
};
const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #ddd",
  padding: "10px 0",
};
const btnBlue = {
  padding: "8px 15px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "5px",
};
const btnRed = {
  padding: "5px 10px",
  background: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
const btnYellow = {
  padding: "5px 10px",
  background: "#ffc107",
  color: "black",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "5px",
};
const btnGrey = {
  padding: "8px 15px",
  background: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default App;
