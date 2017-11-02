### ![alt text](Logo.png)

# QR Code Scanner

*QRCode Scanner - scan QR codes and store them in a central google sheets repository*

### Try it Now
[Prod](https://cdn.rawgit.com/nehag990/qr-scanner/gh-pages/index.html) :
[Dev](https://rawgit.com/nehag990/qr-scanner/gh-pages/index.html)

## Tech
  
  - Create QR Codes via [Google Sheets](https://chrome.google.com/webstore/detail/qr-code-generator/lofihghpipjlmpcnigcopahlpaopcoaa?hl=en-US)
    
  - [Tech:IRL QR Code App](https://github.com/nehag990/qr-scanner) takes the value from the QR code (ie Bob Smith), adds additional data (ie Session or Workshop name), and posts the data to the IFTTT endpoint (ie Google Sheets)
  
  - [Rawgit](http://rawgit.com/) is used to host the application
  
  - [IFTTT](https://ifttt.com/applets/328574p-qr-code-scan-to-vote) (If This Then That) sets up the google sheets endpoint
  
  - Google Sheets to centralize the [Attendance Data](https://drive.google.com/open?id=1LcSxuYBTEzJvbU62wnTgjEjpuNP7bVLjjaXk6wR-eCY)

## Features

  - App Shell.
  
  - Secure via https using [cloudflare free ssl](https://www.cloudflare.com/ssl/)
  
  - Works offline.

  - Fully Responsive.
  
  - Add to home screen, Splash screen.

  - Supported Browser - Google Chrome, Firefox, Opera **(Both Desktop & Mobile)** and now supports iOS as well.

## Installation

1. Clone this repo

  ```bash
  git clone https://github.com/nehag990/qr-scanner.git
  ```

2. Installation

  ```bash
  npm install
  ```

3. Run

  ```bash
  npm run start
  ```

4. Build

  ```bash
  npm run build
  ```

5. Deploy

  ```bash
  npm run deploy
  ```

### Contributions

If you find a bug, please file an issue. PR's are most welcome ;)

