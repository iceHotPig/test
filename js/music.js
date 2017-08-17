window.onload=function(){
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

	//获取父页面上input的dom节点；
  var oInp_songName=window.parent.document.getElementById('inp_songName');
  //获取父页面上getSong的button的dom节点
  var oBtn_getSong=window.parent.document.getElementById('btn_getSong');
	// alert(oInp_songName);

	//获取music页面中的song_list的ul的dom节点；
	var oSong_list=document.getElementById('song_list');
	oSong_list.innerHTML='';
	var oHot_list = document.getElementById('hot_list');

	//首页效果
	//分装search函数
	function search(inpval,num,idom){
		num=Number(num);
		ajax({
					type:'get',
					url:'https://api.imjad.cn/cloudmusic/?type=search&s='+inpval+'&'+'limit'+'='+num,
					async:true,
					success:function(data){
		         
		        //循环获取数据
		        for (var i = 0; i <data.result.songs.length; i++) {
							//新建接受数据的li img p a标签；
							var nLi=document.createElement('li');
							var nImg=document.createElement('img');
							var nP=document.createElement('p');
							var nA=document.createElement('a');

							//添加一个跳转到audio页面的a链接
							nA.setAttribute('href',"../content/audio.html" );
							nA.setAttribute('target', 'my_frame');

					    //将获取图片数据绑定到img标签上；将获取的歌曲信息绑定到p上；
					    nImg.setAttribute('src',data.result.songs[i].al.picUrl );
					    // alert(data.result.songs[i].al.picUrl);
					    nImg.setAttribute('data_id',data.result.songs[i].id);
	            
	            nP.innerText=data.result.songs[i].name;
	            nP.setAttribute('data_id',data.result.songs[i].id);
	            nP.setAttribute('title',data.result.songs[i].name);

					    //将元素标签添加到ul中去；
					    nA.appendChild(nImg);
					    nA.appendChild(nP);
					    nLi.appendChild(nA);
					    idom.appendChild(nLi);
		        }
					}
				})	
    // var oSong_list=document.getElementById('song_list');
    idom.onclick=function(e){ 
    	var e=e||window.event;
    	var itarget=e.srcElement||e.target;
    	if (itarget.nodeName='P'||'IMG'){

	    	// alert(itarget.getAttribute('data_id'));

    		//将获取的id值放到cookie里面；
    	  document.cookie = "id="+itarget.getAttribute('data_id');
    	}
    }
	}
	search('流行','16',oSong_list);
	//获取最热歌曲的资源；
	search('最热','20',oHot_list);
	//点击oBtn_getSong获取歌曲的资源；
	oBtn_getSong.onclick=function(){	
		  oSong_list.innerHTML='';
			search(oInp_songName.value,'16',oSong_list)
		}
	}




