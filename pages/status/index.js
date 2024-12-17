import useSWR from "swr";

async function fetchStatus(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1 style={{ textAlign: "center", color: "#4a4a4a" }}>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchStatus, {
    refreshInterval: 5000,
    // dedupingInterval: 2000,
  });

  let updatedAtText = "Loading...";
  let version = "loading version...";
  let maxConnections = "loading max connections...";
  let openConnections = "loading open connections...";
  let available = "waiting load process";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    version = data.dependencies.database.version;
    maxConnections = data.dependencies.database.max_connections;
    openConnections = data.dependencies.database.open_connections;
    available = maxConnections - openConnections;
  }

  const styles = {
    container: {
      margin: "20px auto",
      padding: "10px",
      maxWidth: "400px",
      fontFamily: "Arial, sans-serif",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      backgroundColor: "rgba(128, 128, 128, 0.1)",
    },
    title: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "10px",
    },
    value: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "8px",
    },
    highlight: {
      color: "#007bff",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>
        Updated at: <span style={styles.highlight}>{updatedAtText}</span>
      </p>
      <p style={styles.value}>
        Database version: <span style={styles.highlight}>{version}</span>
      </p>
      <p style={styles.value}>
        Max connections: <span style={styles.highlight}>{maxConnections}</span>
      </p>
      <p style={styles.value}>
        Open connections:{" "}
        <span style={styles.highlight}>{openConnections}</span>
      </p>
      <p style={styles.value}>
        Available connections: <span style={styles.highlight}>{available}</span>
      </p>
    </div>
  );
}
