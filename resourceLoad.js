/**
 * Created by lu.lu on 2017/3/20.
 */
var ResourceData= {
    Images:{
        //path：文件相对路径，picNum:当前图片中宽和高包含的小图片数，cellSize:小图片的宽和高，data：存放加载的图片数据。
         images001:{path:"images/images001.png", picNum:{WNum:2,HNum:6},cellSize:{width:32,height:32}, data:null},
         images002:{path:"images/images002.png", picNum:{WNum:1,HNum:1},cellSize:{width:96,height:96}, data:null}
    },
    Sound:{
        //soundName:声音文件名称，path：文件夹相对路径，data：存放加载的声音数据。由于各种浏览器对声音格式的支持不一致，声音文件格式有MP3和OGG两种
        sound001:{soundName:"sound001",path:"sound/", data:null},
        sound002:{soundName:"sound002",path:"sound/", data:null}
    }
};

var PreLoadData = function () {
    var loadedNum = 0;//已加载资源数量
    var resourceNum = 0;//资源数量
    var postAction = function () {};//资源加载完成后的回调函数
    function imageLoadPost() {//每成功加载一个图片执行一次
        loadedNum++;
        if (loadedNum == resourceNum) {//全部图片文件加载完后，继续加载声音
            loadedNum=0;
            resourceNum=0;
            loadAudio()
        }
    }
    function audioLoadPost() {//每成功加载一个声音执行一次
        loadedNum++;
        if (loadedNum == resourceNum) {//全部声音文件加载完后，执行回调函数
            postAction()
        }
    }
    function loadImage(){//加载图片
        for (var m2 in ResourceData.Images)  resourceNum++;
        for (var m2 in ResourceData.Images) {
            ResourceData.Images[m2].data = new Image();
            ResourceData.Images[m2].data.src = ResourceData.Images[m2].path;
            ResourceData.Images[m2].data.onload = function () {
                imageLoadPost();
            }
            ResourceData.Images[m2].data.onerror = function () {
                alert("资源加载失败！")
                return;
            }
        }
    }
    function loadAudio(){//加载声音
        for (var m1 in ResourceData.Sound)  resourceNum++;
        for (var m1 in ResourceData.Sound) {
            ResourceData.Sound[m1].data = new Audio();
            var playMsg = ResourceData.Sound[m1].data.canPlayType('video/ogg');//测试浏览器是否支持该格式声音
            if ("" != playMsg) {
                ResourceData.Sound[m1].data.src= ResourceData.Sound[m1].path + ResourceData.Sound[m1].soundName + ".ogg";
            } else {
                ResourceData.Sound[m1].data.src= ResourceData.Sound[m1].path + ResourceData.Sound[m1].soundName + ".mp3";
            }
            ResourceData.Sound[m1].data.addEventListener("canplaythrough", function () {
                audioLoadPost();
            }, false);
            ResourceData.Sound[m1].data.addEventListener("error", function () {
                alert("资源加载失败！");
                return;
            }, false);
        }
    }
    loadImage();
    return {
        done:function (f) {
            if (f)postAction = f;
        }
    }
};


/// main 调用
PreLoadData().done(function () {

    // todo
});