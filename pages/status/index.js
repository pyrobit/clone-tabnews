import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1 style={{ textAlign: "center", color: "#4a4a4a" }}>Status</h1>
      <div style={styles.container}>
        <UpdatedAt />
        <DatabaseStatus />
      </div>
    </>
  );
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

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000,
    // dedupingInterval: 2000,
  });

  let updatedAtText = "Loading...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <div>
      <p style={styles.title}>
        Updated at: <span style={styles.highlight}>{updatedAtText}</span>
      </p>
    </div>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000,
    // dedupingInterval: 2000,
  });

  let databaseStatusInformation = "Loading...";

  if (!isLoading && data) {
    let maxConnections = data.dependencies.database.max_connections;
    let openConnections = data.dependencies.database.open_connections;
    let availableConnections = maxConnections - openConnections;
    databaseStatusInformation = (
      <>
        <div>Version: {data.dependencies.database.version}</div>
        <div>Max connections: {maxConnections}</div>
        <div>Open connections: {openConnections}</div>
        <div>Connections available: {availableConnections}</div>
      </>
    );
  }
  return (
    <>
      <h2 style={styles.title}>Database</h2>
      <div>{databaseStatusInformation}</div>
    </>
  );
}
