#  ueditorImageDelete #
ueditor图片列表的删除效果，及获取删除图片链接的接口。
## 演示效果 ##
![](http://i.imgur.com/huoabTl.gif)

## 使用 ##
**1. 在ueditor/dialogs/image/image.html文件中，在header中引入css** <br>
**2. 在ueditor/dialogs/image/image.html文件中，在底部中引入ueDeleteImages.js文件**<br>
**3. 引入ueimagedelete.js,可以使用ueditorDeleteImages方法。**<br>
     <pre>
	<code>ueditorDeleteImages(function (imageSrc,showMsgObj, deleteImages) {})</code></pre>


> **ueditorDeleteImages的方法必须是一个回调函数。回调函数中会传入3个参数。含义分别是：<br>**


|     参数    |   类型  |    类型  |
| :----   | :---  |:---  |
| imageSrc|string| 删除图片的链接地址      |
| showMsgObj|object| 信息显示对象。包含error和success两个方法      |
| deleteImages|function（无参）| 删除列表中的图片方法，一般在服务删除成功后，再调用该方法      |
<br>