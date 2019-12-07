export default function handle(req, res) {
  if (req.method === 'POST') {
    // create player woth req.body
    res.status(201).end('Created.')
  }
  if (req.method === 'PATCH') {
    // update player with req.body
    res.status(201).end('Updated.')
  }
}
