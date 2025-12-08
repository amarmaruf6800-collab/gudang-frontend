import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Pastikan endpoint ini sesuai dengan backend kamu
      const response = await fetch(
        "https://belajar-backend-nu.vercel.app/barang",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Login Berhasil!");
        onLogin(true); // Memberitahu App.jsx kalau sudah login
      } else {
        setError(data.pesan);
      }
    } catch (err) {
      console.error(err);
      setError("Gagal menghubungi server");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login Admin 🔐</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={styles.button} type="submit">
            MASUK
          </button>
        </form>
      </div>
    </div>
  );
}

// Styling sederhana
const styles = {
  container: { display: "flex", justifyContent: "center", marginTop: "100px" },
  card: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
  },
  input: {
    display: "block",
    width: "90%",
    padding: "10px",
    margin: "10px auto",
  },
  button: {
    width: "95%",
    padding: "10px",
    background: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Login;
