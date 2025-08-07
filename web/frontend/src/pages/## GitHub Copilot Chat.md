## GitHub Copilot Chat

- Extension Version: 0.23.2 (prod)
- VS Code: vscode/1.96.4
- OS: Windows

## Network

User Settings:
```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 20.87.245.6 (457 ms)
- DNS ipv6 Lookup: Error (428 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (15 ms)
- Electron fetch (configured): HTTP 200 (1335 ms)
- Node.js https: HTTP 200 (1289 ms)
- Node.js fetch: HTTP 200 (233 ms)
- Helix fetch: HTTP 200 (419 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.113.21 (62 ms)
- DNS ipv6 Lookup: Error (67 ms): getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Proxy URL: None (5 ms)
- Electron fetch (configured): HTTP 200 (905 ms)
- Node.js https: HTTP 200 (882 ms)
- Node.js fetch: HTTP 200 (852 ms)
- Helix fetch: HTTP 200 (874 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).