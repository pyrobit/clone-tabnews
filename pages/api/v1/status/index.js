import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const postgresVersionResponse = await database.query("SHOW server_version;");
  const databaseVersionValue = postgresVersionResponse.rows[0].server_version;

  const databaseMaxConnectionsresult = await database.query(
    "SHOW max_connections;"
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsresult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  // const databaseName = request.query.databaseName;
  // console.log(`DB selectionado: ${databaseName}`);
  const databasOpenConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenConnectionnsValue =
    databasOpenConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        open_connections: databaseOpenConnectionnsValue,
      },
    },
  });
}

export default status;
