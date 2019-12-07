export default function handle(req, res) {
  if (req.method === "POST") {
    // create game woth req.body
    res.status(201).end("Created.");
  }
  if (req.method === "PATCH") {
    // update game with req.body
    res.status(201).end("Updated.");
  }
}
