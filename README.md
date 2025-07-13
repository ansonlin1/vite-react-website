# React TypeScript Website with Podman

This project is a React TypeScript website that runs in a Podman container. No local Node.js installation is required.

## Prerequisites

- Podman installed on your system
  - Windows: Install from https://github.com/containers/podman/releases
  - Linux: Use your distribution's package manager
  - macOS: `brew install podman`

## Building and Running the Project

### First Time Setup

1. Build the container:
```powershell
podman build -t react-app .
```

2. Run the container:
```powershell
podman run -d -p 8080:80 --name react-website react-app
```

The application will be available at http://localhost:8080

### Daily Usage Commands

- Start the container:
```powershell
podman start react-website
```

- Stop the container:
```powershell
podman stop react-website
```

- View container logs:
```powershell
podman logs react-website
```

- List running containers:
```powershell
podman ps
```

### Rebuilding After Changes

1. Stop and remove the existing container:
```powershell
podman stop react-website
podman rm react-website
```

2. Rebuild and run:
```powershell
podman build -t react-app .
podman run -d -p 8080:80 --name react-website react-app
```

### Cleanup

To remove all containers and images:
```powershell
podman stop react-website
podman rm react-website
podman rmi react-app
podman system prune -f
```
```
