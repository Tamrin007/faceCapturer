# faceCapturer

## 概要

動画鑑賞中の顔をキャプチャする実験用アプリケーション

キャプチャした画像は `./<appname>-darwin-x64/<yyyy-M-d>` に書き込まれる。

## 必要環境

- macOS 10.8 or later
- [Node.js](https://nodejs.org/en/download/) (0.10.x or above)
- Command Line Tools for [Xcode](https://developer.apple.com/xcode/downloads/) (run `xcode-select --install` to install)

## インストール方法

```sh
$ git clone git@github.com:Tamrin007/faceCapturer.git
$ cd faceCapturer
$ npm install
$ cd ..
$ npm install -g electron-prebuilt
$ npm install -g electron-packager
$ electron-packager faceCapturer <appname> --platform=darwin --arch=x64 [optional flags...]
$ open ./<appname>-darwin-x64/<appname>.app
```
