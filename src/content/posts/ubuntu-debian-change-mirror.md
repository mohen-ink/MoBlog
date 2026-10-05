---
title: Ubuntu 与 Debian 各版本换源指南
published: 2026-10-05
description: 'Ubuntu 24.04/22.04/20.04 与 Debian 13/12/11 各流行版本的 apt 换源方法，含 deb822 新格式与传统 sources.list 的写法，以及常见坑。'
image: ''
tags: [Linux, Ubuntu, Debian, apt]
category: 'Linux'
draft: false
lang: ''
---

装好系统的第一件事，多半是把 apt 源换成国内镜像——不然一次 `apt update` 能让你等到怀疑人生。但 Ubuntu 和 Debian 近几个版本的源配置文件格式悄悄变了，直接照抄几年前的教程经常踩坑。这篇文章按版本整理一遍，抄就完事了。

## 一、先分清两种源格式

| 格式 | 文件位置 | 默认使用版本 |
|---|---|---|
| 传统一行式 | `/etc/apt/sources.list` | Ubuntu ≤ 22.04，Debian ≤ 12 |
| deb822 新式 | `/etc/apt/sources.list.d/*.sources` | Ubuntu ≥ 24.04，Debian ≥ 13 |

动手之前先备份原文件，翻车了还能救：

```bash
sudo cp /etc/apt/sources.list{,.bak} 2>/dev/null
sudo cp -r /etc/apt/sources.list.d /etc/apt/sources.list.d.bak 2>/dev/null
```

判断自己该用哪种格式也很简单：`ls /etc/apt/sources.list.d/*.sources` 能列出文件就是新格式，否则看 `/etc/apt/sources.list`。

下文全部以清华 TUNA 源为例，换成别的镜像把域名替换掉即可。

## 二、Ubuntu 换源

### Ubuntu 24.04 及更新（deb822 格式）

24.04 起源配置搬到了 `/etc/apt/sources.list.d/ubuntu.sources`，一条 sed 就能搞定：

```bash
sudo sed -i 's@//.*archive\.ubuntu\.com@//mirrors.tuna.tsinghua.edu.cn@g' \
  /etc/apt/sources.list.d/ubuntu.sources
```

ARM、RISC-V 等非 x86 架构的机器（树莓派、ARM 云主机）源走的是 `ubuntu-ports`，域名是 `ports.ubuntu.com`，上面那条匹配不到，要换成：

```bash
sudo sed -i 's@//ports\.ubuntu\.com@//mirrors.tuna.tsinghua.edu.cn@g' \
  /etc/apt/sources.list.d/ubuntu.sources
```

如果想像 Debian 一样手写完整文件，内容是这样的（24.04 代号 noble）：

```text
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
Suites: noble noble-updates noble-backports noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

### Ubuntu 22.04 / 20.04（传统格式）

编辑 `/etc/apt/sources.list`，以 22.04（jammy）为例：

```text
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
```

20.04 把 `jammy` 换成 `focal` 即可，其余不变。

四个组件的含义：`main` 是 Ubuntu 官方支持的自由软件，`universe` 是社区维护的软件（量最大），`restricted` 是受限的驱动（如闭源显卡驱动），`multiverse` 是非自由软件（版权有争议的那批）。日常四个都开齐就行。

快速替换一条命令：

```bash
sudo sed -i 's@//.*archive\.ubuntu\.com\|//security\.ubuntu\.com@//mirrors.tuna.tsinghua.edu.cn@g' \
  /etc/apt/sources.list
```

> ARM、RISC-V 等非 x86 架构的机器（比如树莓派、ARM 云主机）用的是 `ubuntu-ports` 仓库，URI 要写 `mirrors.xxx/ubuntu-ports/`，不然会全 404。

## 三、Debian 换源

### Debian 13 Trixie（deb822 格式）

Trixie 默认就是新格式，编辑 `/etc/apt/sources.list.d/` 下的 `.sources` 文件（通常是 `debian.sources`，个别镜像里安全源可能单独放在 `debian-security.sources`，先 `ls` 确认下文件名）：

```text
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/debian
Suites: trixie trixie-updates trixie-backports
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/debian-security
Suites: trixie-security
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
```

不想手改也可以一键替换——Trixie 默认文件里主源和安全源都走 `deb.debian.org`，一条 sed 覆盖：

```bash
sudo sed -i 's@deb\.debian\.org\|security\.debian\.org@mirrors.tuna.tsinghua.edu.cn@g' \
  /etc/apt/sources.list.d/debian.sources
```

### Debian 12 Bookworm（传统格式）

```text
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm main contrib non-free non-free-firmware
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-updates main contrib non-free non-free-firmware
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-backports main contrib non-free non-free-firmware
deb https://mirrors.tuna.tsinghua.edu.cn/debian-security/ bookworm-security main contrib non-free non-free-firmware
```

注意 Bookworm 起多了 `non-free-firmware` 组件，漏掉的话装系统时缺的固件驱动还是装不上。

### Debian 11 Bullseye

```text
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian-security/ bullseye-security main contrib non-free
```

### 传统格式一键替换

官方源改成镜像站的 sed 命令，Debian 各版本通用：

```bash
sudo sed -i 's/deb\.debian\.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
sudo sed -i 's/security\.debian\.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
```

## 四、换完之后

```bash
sudo apt update    # 刷新索引，顺便验证有没有 404 或签名报错
sudo apt upgrade   # 可选
```

`apt update` 输出干净没有 `Err` / `404` / `NO_PUBKEY`，就算成功了。

## 五、常用国内镜像站

| 镜像 | 地址 |
|---|---|
| 清华 TUNA | `mirrors.tuna.tsinghua.edu.cn` |
| 中科大 USTC | `mirrors.ustc.edu.cn` |
| 阿里云 | `mirrors.aliyun.com` |
| 腾讯云 | `mirrors.cloud.tencent.com` |
| 华为云 | `mirrors.huaweicloud.com` |
| 网易 | `mirrors.163.com` |

云服务器可以优先用各家的内网镜像（如 `mirrors.cloud.aliyuncs.com`），免流量且速度快，但仅限自家 ECS 内网访问。

## 六、几个常见的坑

- **EOL 版本**：Ubuntu 18.04 等已停止支持的版本被挪到了 `old-releases.ubuntu.com`；Debian 10 及更老的要去 `archive.debian.org`，普通镜像站已经没有这些版本了。
- **Debian 安全源写法变化**：Debian 11 及以后套件名是 `xxx-security`（如 `bookworm-security`），Debian 10 及更早是 `xxx/updates`（如 `buster/updates`），照抄旧教程会写错。
- **格式别混用**：deb822 的 `.sources` 文件里 `Suites:` 可以一行写多个，传统格式一个 `deb` 行只能写一个套件，别把两种语法杂交。
- **只改源不动组件**：Debian 默认官方源可能没有 `non-free-firmware`，需要非自由固件的机器记得加上。

## 参考

- [清华大学开源软件镜像站 - Ubuntu](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)
- [清华大学开源软件镜像站 - Debian](https://mirrors.tuna.tsinghua.edu.cn/help/debian/)
- [中科大 USTC 镜像站 - Debian](https://mirrors.ustc.edu.cn/help/debian.html)
- [deb822-style sources.list 格式说明](https://manpages.debian.org/sources.list.5)
