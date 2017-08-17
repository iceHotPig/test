window.onload=function(){
	let icookie = document.cookie;
	let arrCookie = icookie.split("; ");
	let idCookie = arrCookie[0].split("=");
  //分装的ajax
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
  
  // ajax获取资源
  ajax({
  	type:'get',
  	url:'https://api.imjad.cn/cloudmusic/?type=mv&id='+idCookie[1],
  	async: true,
  	success:function(data){
  		var oVideo=document.getElementById('video_play');
  		var oSl=document.getElementById('sl');
  		var oBq=document.getElementById('bq');
  		var oGq=document.getElementById('gq');
  		var oCq=document.getElementById('cq');
  		oVideo.setAttribute('src',data.data.brs['240']);
  		if (!data.data.brs['480']) {
  			oBq.style.display="none"
  		}else{
  			oBq.onclick=function(){
  				oVideo.setAttribute('src',data.data.brs['480']);
  			}
  		}
     if (!data.data.brs['720']) {
     		oGq.style.display="none"
     	}else{
  			oGq.onclick=function(){
  				oVideo.setAttribute('src',data.data.brs['720']);
  			}
     	}
      if (!data.data.brs['1080']) {
     		oCq.style.display="none"
     	}else{
  			oCq.onclick=function(){
	  			oVideo.setAttribute('src',data.data.brs['1080']);
	  		}
     	}	
		}
	})
   // ajax 获取歌曲的详情；
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
  //ajax 获取评论的详情；
  console.log(idCookie[1]);
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