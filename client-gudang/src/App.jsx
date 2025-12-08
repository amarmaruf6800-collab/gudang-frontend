import { useState, useEffect } from "react";
import Login from "./Login";

function App() {
  const [barang, setBarang] = useState([]);
  const [sudahLogin, setSudahLogin] = useState(false);

  // State Form
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("");
  const [stok, setStok] = useState("");
  const [editId, setEditId] = useState(null);

  const endpoint = "https://belajar-backend-nu.vercel.app/barang";

  // 1. FUNGSI AMBIL DATA
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
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataKirim),
        });
      } else {
        await fetch(`${endpoint}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataKirim),
        });
      }

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

  // 4. FUNGSI PERSIAPAN EDIT
  function aktifkanEdit(item) {
    setEditId(item.id);
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
    if (sudahLogin) {
      ambilData();
    }
  }, [sudahLogin]);

  if (!sudahLogin) {
    return <Login onLogin={setSudahLogin} />;
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.appContainer}>
        {/* Header dan Tombol Logout */}
        <div style={styles.headerSection}>
          <h1 style={{ color: "#007bff", margin: 0, fontSize: "2em" }}>
            Gudang React JS 🚀
          </h1>
          <button
            onClick={() => setSudahLogin(false)}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </div>

        {/* Form Input */}
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>
            {editId ? "Edit Barang" : "Tambah Barang Baru"}
          </h3>

          <form onSubmit={simpanData}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Nama Barang"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                style={styles.formInput}
                required
              />
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                style={styles.formInput}
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
                style={styles.formInput}
                required
              />
              <input
                type="number"
                placeholder="Stok"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
                style={styles.formInput}
                required
              />
            </div>

            <div style={styles.btnActionGroup}>
              <button type="submit" style={styles.btnPrimary}>
                {editId ? "UPDATE" : "SIMPAN"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={styles.btnSecondary}
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Daftar Barang */}
        <h2
          style={{
            fontSize: "1.5em",
            color: "#343a40",
            marginTop: "10px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          Daftar Barang ({barang.length})
        </h2>
        <ul style={styles.itemList}>
          {barang.map((item) => (
            <li key={item.id} style={styles.itemCard}>
              <div style={styles.itemInfo}>
                <strong style={{ fontSize: "1.1em", color: "#343a40" }}>
                  {item.nama_barang}
                </strong>{" "}
                <br />
                <small style={{ color: "#6c757d" }}>
                  Rp {item.harga} | Stok: {item.stok} | Kategori: **
                  {item.kategori}**
                </small>
              </div>
              <div style={styles.actionButtons}>
                <button
                  onClick={() => aktifkanEdit(item)}
                  style={styles.btnEdit}
                >
                  Edit
                </button>
                <button
                  onClick={() => hapusData(item.id)}
                  style={styles.btnDelete}
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Styling (CSS in JS)
const styles = {
  // WRAPPER: Memastikan konten berada di tengah horizontal
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 0",
  },
  appContainer: {
    width: "100%",
    maxWidth: "900px",
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    paddingBottom: "15px",
    borderBottom: "3px solid #007bff",
  },
  logoutButton: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s",
  },
  formCard: {
    background: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
    border: "1px solid #e9ecef",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  formTitle: {
    color: "#007bff",
    borderBottom: "2px solid #007bff",
    paddingBottom: "5px",
    marginBottom: "15px",
    fontSize: "1.3em",
  },
  inputGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  formInput: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ced4da",
    width: "25%",
    boxSizing: "border-box",
  },
  btnActionGroup: {
    marginTop: "10px",
  },
  itemList: {
    listStyle: "none",
    padding: 0,
  },
  itemCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    border: "1px solid #dee2e6",
    borderRadius: "6px",
    padding: "15px",
    marginBottom: "10px",
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.08)",
    transition: "box-shadow 0.2s",
  },
  itemInfo: {
    flexGrow: 1,
  },
  actionButtons: {
    minWidth: "150px",
    display: "flex",
    justifyContent: "flex-end",
  },
  // Button Styles
  btnPrimary: {
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    fontWeight: "bold",
  },
  btnSecondary: {
    padding: "10px 20px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  btnDelete: {
    padding: "8px 12px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    marginLeft: "8px",
  },
  btnEdit: {
    padding: "8px 12px",
    background: "#ffc107",
    color: "black",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default App;
