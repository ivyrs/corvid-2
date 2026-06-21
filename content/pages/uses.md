---
hide: false
desc: what ivy uses
icon: fa-solid fa-shelves
---

```yaml
phone: Apple iPhone 16 (128gb, teal)
watch: Apple Watch SE2 (black with grey band)
headphones: ["Apple AirPods Pro 3", "Apple Airpods Max", "AKG M220"]
```

### the fleet

<!-- todo: make these actual neofetches -->

#### aspen - 15' macbook air

```yaml
- os: macOS tahoe # :(
- cpu: Apple M2
- ram: 16GB
- ssd: 1TB
```

#### maple - thinkpad t480

```yaml
- os: Arch Linux
- cpu: i5-8270
- ram: 64GB
- ssd: 256GB
```

#### elm - thinkcenter homelab

```yaml
- os: NixOS 25.11
- cpu: i5-7500
- ram: 16GB
- storage:
      - ssd: 120GB
      - ssd: 2048GB # possibly borked :(
```

---

### software

```yaml
editor: ["neovim", "gram"]
shell: zsh

# macOS
launcher: raycast

# linux
wm: niri + noctalia shell
term: foot
```
