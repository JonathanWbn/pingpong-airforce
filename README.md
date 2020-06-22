# Ping Pong Airforce

[pingpong.airforce](https://pingpong.airforce/) is a web app to track the ping pong games that are going down at @ePages-de headquarters in Hamburg, Germany.

## Installation

Use the package manager [yarn](https://yarnpkg.com/) to install dependencies.

```bash
yarn install
```

## Running

You'll need to add an `.env` file with environment variables:

- `MONGO_DB_URL`
- `CLEVERPUSH_SECRET` (optional)

You can either use your own or contact me (jwieben@hey.com) and I might give them to you.

#### Commands

- `yarn dev`: Starts development server with hot reloading.
- `yarn build`: Creates a production build.
- `yarn start`: Starts production server using the production build.
- `yarn lint`: Runs linting checks ([eslint](https://eslint.org/)) and formatting checks ([prettier](https://prettier.io/)).
- `yarn fixlint`: Automatically fixes linting and formatting issues if possible.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[ISC](https://choosealicense.com/licenses/isc/)
