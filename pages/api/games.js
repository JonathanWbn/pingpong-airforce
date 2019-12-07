import mockData from '../../mock-data.json'

export default function handle(req, res) {
  if (req.method === 'GET') {
    // get and send games
    res.send(mockData.games)
  }
}
