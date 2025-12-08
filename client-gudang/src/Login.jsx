import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://belajar-backend-nu.vercel.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Login Berhasil!");
        onLogin(true);
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
        <h2 style={styles.cardTitle}>Login Gudang 🔑</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}
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

// Styling (CSS in JS)
const styles = {
  // CONTAINER: Mengisi viewport penuh dan memusatkan konten
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#e9ecef",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
  },
  cardTitle: {
    color: "#343a40",
    marginBottom: "30px",
    fontSize: "1.8em",
  },
  input: {
    display: "block",
    width: "90%",
    padding: "14px",
    margin: "15px auto",
    border: "1px solid #ced4da",
    borderRadius: "5px",
    fontSize: "1em",
    boxSizing: "border-box",
  },
  button: {
    width: "95%",
    padding: "14px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.1em",
    fontWeight: "bold",
    marginTop: "20px",
    transition: "background-color 0.3s",
  },
  errorMessage: {
    color: "#dc3545",
    marginBottom: "15px",
    fontWeight: "500",
  },
};

export default Login;
