var $ = require('jquery');
var fs = require('fs-extra');
var movie = document.getElementById("movie");

// ページロード時にカメラを準備
$(function() {
    //videoタグを取得
    var video = document.getElementById('camera');
    //カメラが起動できたかのフラグ
    var localMediaStream = null;
    //カメラ使えるかチェック
    var hasGetUserMedia = function() {
        return (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    };

    //エラー
    var onFailSoHard = function(e) {
        console.log('エラー!', e);
    };

    if (!hasGetUserMedia()) {
        alert("未対応ブラウザです。");
    } else {
        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        navigator.getUserMedia({
            video: true
        }, function(stream) {
            video.src = window.URL.createObjectURL(stream);
            localMediaStream = stream;
        }, onFailSoHard);
    }

    // スタートボタンが押されたら、3秒ごとにCanvasを描画する
    var timer;
    var delay = 3000;
    $("#start").click(function() {
        movieStart();
        drawCanvas(localMediaStream, video);
        timer = setInterval(function() {
            drawCanvas(localMediaStream, video)
        }, delay);
    });

    // 動画が終了したら描画を止める
    movie.addEventListener("ended", function() {
        clearInterval(timer);
    }, false);
});

// Canvas に描画
function drawCanvas(localMediaStream, video) {
    if (localMediaStream) {
        var canvas = document.getElementById('canvas');
        //canvasの描画モードを2dに
        var ctx = canvas.getContext('2d');
        var img = document.getElementById('img');

        //videoの縦幅横幅を取得
        var w = video.offsetWidth;
        var h = video.offsetHeight;

        //同じサイズをcanvasに指定
        canvas.setAttribute("width", w);
        canvas.setAttribute("height", h);

        //canvasにコピー
        ctx.drawImage(video, 0, 0, w, h);

        //ここから画像のバイナリ化
        var can = canvas.toDataURL();
        // Data URLからBase64のデータ部分のみを取得
        var base64Data = can.split(',')[1];

        // // base64形式の文字列をデコード
        // var data = window.atob(base64Data);
        // var buff = new ArrayBuffer(data.length);
        // var arr = new Uint8Array(buff);
        //
        // // blobの生成
        // for (var i = 0, dataLen = data.length; i < dataLen; i++) {
        //     arr[i] = data.charCodeAt(i);
        // }
        // var blob = new Blob([arr], {
        //     type: 'image/png'
        // });

        var time = new Date();
        // あと何番目の動画かを付け足す
        var dirName = __dirname + '/../../../../' + time.getFullYear() + '_' + time.getMonth() + '_' + time.getDate() + '/';
        var fileName = movie.currentTime + '.png';
        writeFile(dirName, fileName, base64Data);
    }
}

// ビデオの再生、顔のキャプチャを開始
function movieStart() {
    movie.play();
}

// 画像をローカルに保存
function writeFile(path, file, data) {
    fs.mkdirsSync(path);
    console.log(path);
    fs.writeFile(path + file, data, 'base64', function(error) {
        if (error != null) {
            alert('error : ' + error);
        }
    });
}
