function status(request, response) {
  response.status(200).json({ chave: "Status response" });
}

export default status;
