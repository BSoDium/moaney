# 🪙 Moneytor. 

Moneytor is a lightweight web application built on top of the Wakatime API. It allows you to view your coding activity in a simple and easy to understand way, while calculating your earnings based on your hourly rate.

## Prerequisites

This application requires a Wakatime API key. You can get one by signing up for a free account at [Wakatime](https://wakatime.com/). The data used to calculate your earnings is based on your coding activity, and therefore requires you to have Wakatime plugins installed and configured on your IDEs.

## Browser configuration

At this time, Moneytor requires the use of an HTTP request interceptor to work properly (you will not be able to authenticate without it). I recommend using [Requestly](https://requestly.io/) for this purpose, since it is completely free, and a ready-to-use configuration is provided [here](https://app.requestly.io/rules/#sharedList/1670083906431-Wakatime).

For more information on how and why this is required, please refer to https://github.com/BSoDium/moneytor/issues/3.

## Developer setup

This project uses [Yarn](https://yarnpkg.com/) as its package manager, and is based on Create-react-app template. To install the dependencies, run:

```bash
yarn install
```

To start the development server, run:

```bash
yarn start
```

To build the application for production, run:

```bash
yarn build
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
