test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://0.0.0.0:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.open_connections).toEqual(1);

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody).not.toHaveProperty("password");
  expect(responseBody).not.toHaveProperty("email");
});

// test.only("SQL Injection Test", async () => {
//   await fetch("http://0.0.0.0:3000/api/v1/status?databaseName=local_p0stgres");
// });
