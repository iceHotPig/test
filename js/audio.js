window.onload=function(){
	let icookie = document.cookie;
	let arrCookie = icookie.split("; ");
	let idCookie = arrCookie[0].split("=");
  //将在music页面存储的数据提取出来，
	// console.log(idCookie[1]);
  
  //分装一个原生js的ajax
	function ajax(option){
	  var type=option.type;
	  var url=option.url;
	  var async=option.async;
	  var success=option.success;
	  var xml = null;
	  if(window.XMLHttpRequest){
	     xml = new XMLHttpRequest();
	  }else {
	     xml = new ActiveXObject("Microsoft.XMLHttp");
	  }

	  xml.open(type,url,async);
	  xml.send();

	  xml.onreadystatechange = function (){
	    if(xml.readyState == 4){
	      if (xml.status==200) {
	       // var body=JSON.parse(xml.responseText);//转化为对象类型
	         success&&success(JSON.parse(xml.responseText));
	      }
	    }
	  }
	}
  //ajax获取歌曲资源；
  ajax({
  	type:'get',
  	url:'https://api.imjad.cn/cloudmusic/?type=song&id='+idCookie[1],
  	async:true,
  	success:function(data){
  		// 获取audio的dom节点；
  		var oAudio=document.getElementsByTagName('audio')[0];
  		oAudio.setAttribute('src',data.data[0].url);
  	}
  })
  //ajax 获取歌曲的详情；
  ajax({
  	type:'get',
  	url:'https://api.imjad.cn/cloudmusic/?type=detail&id='+idCookie[1],
  	async:true,
  	success:function(data){
  	//获取audio页面中p值的dom节点；
    var oAudio_artist=document.getElementById('audio_artist');
    var oAudio_name=document.getElementById('audio_name');
    var oAudio_album=document.getElementById('audio_album');
    var oAudio_pic=document.getElementById('audio_pic');
    

    oAudio_artist.innerText='歌手名 ： '+data.songs[0].ar[0].name;
    oAudio_name.innerText='歌名 :  '+data.songs[0].name;
    oAudio_album.innerText='专辑名 :  '+data.songs[0].al.name;
    oAudio_album.setAttribute('title',data.songs[0].al.name);
    oAudio_pic.setAttribute('src',data.songs[0].al.picUrl);

  	}
  })
  // alert(idCookie[1]);
  //ajax 获取歌曲的歌词；
  ajax({
    type:'get',
    url:'https://api.imjad.cn/cloudmusic/?type=lyric&id='+idCookie[1],
    async:true,
    success:function(data){
      var get_lyric=data.lrc.lyric
      // alert(get_lyric);
      //将时间从歌词中提取出来的正则表达式；
      var reg=/\[\d{2}\:\d{2}\.\d{1,3}\]/g;
      // var reg=/\[\d{2}\:\d{2}\.\d{1,3}\]/g;
      //将时间中的数值提取的数值的表达式；
      var reg1 = /\d+/g;
      //将歌词提取出来；
      var str_lyric=get_lyric.replace(reg,'');
      //将歌词变成数组；
      var arr_lyric=str_lyric.split('\n');
      //将歌词里面的时间提取出来；
      var get_time=get_lyric.match(reg);
      // alert(get_time.length);
      var arr_seconds = [];
     for (var i = 0; i <get_time.length; i++) {
         //将时间变成数组；
         var arr_time=get_time[i].match(reg1);
         // console.log(Array.isArray(arr_time))
         //将时间变成秒；
         var seconds=parseInt(arr_time[0]*60)+parseInt(arr_time[1])+parseInt(arr_time[2]/1000);
         // seconds变成数组；

         arr_seconds.push(seconds);
      }
        // console.log(arr_lyric);
        // console.log(arr_time);
        //获取存放歌词的p audio元素的dom节点；
      var oAudio_lyric=document.getElementById('audio_lyric');
      var oAudio=document.getElementsByTagName('audio')[0];
      oAudio_lyric.innerText='';
      oAudio_lyric.style.color='red';
      oAudio.ontimeupdate = function(){
        for (var i = 0; i <arr_seconds.length; i++) {
          if (oAudio.play) {
            var curr = oAudio.currentTime;
            if (curr>arr_seconds[i]) {
              // console.log(arr_lyric[i]);
              oAudio_lyric.innerText=arr_lyric[i]
            }
          }
        }
      }
    }
  })
  //ajax 获取评论的详情；
  // console.log(idCookie[1]);
  ajax({
    type:'get',
    url:'https://api.imjad.cn/cloudmusic/?type=comments&id='+idCookie[1],
    async:true,

    success:function(data){
      // alert(data.hotComments.length);
      var oAudio_comment_list=document.getElementById('oAudio_comment_list');
      oAudio_comment_list.innerHTML='';
      for (var i = 0; i <data.hotComments.length; i++) {
        //新建存储评论的信息元素；
        var nLi=document.createElement('li');
        var nImg=document.createElement('img');
        var nH3=document.createElement('h3');
        var nP=document.createElement('p');

        //将ajax获取的数据绑定到新建的标签里；
        // console.log(data.hotComments[i].user.avatarUrl);
        nImg.setAttribute('src',data.hotComments[i].user.avatarUrl);
        // console.log(data.hotComments[i].user.nickname);
        nH3.innerText=data.hotComments[i].user.nickname;
        // console.log(data.hotComments[i].content);
        nP.innerText=data.hotComments[i].content;

        //将标签添加到ul li里面;
        nLi.appendChild(nImg);
        nLi.appendChild(nH3);
        nLi.appendChild(nP);
        oAudio_comment_list.appendChild(nLi);
      }
    }
  })
} 