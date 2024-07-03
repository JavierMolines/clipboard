# Clipboard Manager

> [!IMPORTANT]
> The server does not store any data entered in the view; all information is managed through localStorage.

### Development Setup

First, clone the repo and cd into the project:

## Local setup

Install Angular CLI

```bash
npm install -g @angular/cli
```

Verify install

```bash
ng version
```

Install dependencies

```bash
npm i
```

## Run locally

Development server

```bash
npm run dev
```

Generate build

```bash
npm run build
```

Move project to folder in Nginx ( Optional )

```bash
sudo chmod +x ./moveNginx.sh # Add execution permissions
```

```bash
sudo ./moveNginx.sh # Run as sudo by permissions on the /var/www/ folder
```
