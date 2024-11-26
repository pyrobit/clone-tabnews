test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://0.0.0.0:3000/api/v1/status");
  expect(response.status).toBe(200);
});
