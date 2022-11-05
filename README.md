# Phoenicis

## Installation

```sh
npm ci
```

## configuration

Place un fichier de variable d'environnement (.env) à la racine du dossier api.

```env

PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=######
DRIVE_DISK=local

DATABASE_URL="mongodb://$monguser:$mongopassword@$mongohost:$mongoport/forgottenShores?authSource=admin"

REDIS_CONNECTION=#####
REDIS_HOST=####
REDIS_PORT=####
REDIS_PASSWORD=#####

LOG_LEVEL='debug'


```

## Développement

### Lancer l'api et le front

```sh
npm run dev
```

### Lancer une seule des applications

```sh
npm run dev:{www,api}
```

### Build dépendances

```sh
npm run build:deps
```
