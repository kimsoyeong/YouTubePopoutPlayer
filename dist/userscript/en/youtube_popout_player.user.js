// ==UserScript==
// @name        YouTube Popout Player
// @author      Ryan Thaut <rthaut@gmail.com> (http://ryanthaut.com)
// @description Provides a simple way to open any YouTube video in a popout window
// @version     2.1.1
// @namespace   https://github.com/rthaut/YouTubePopoutPlayer
// @updateURL   https://github.com/rthaut/YouTubePopoutPlayer/raw/master/dist/userscript/youtube_popout_player.user.js
// @downloadURL https://github.com/rthaut/YouTubePopoutPlayer/raw/master/dist/userscript/youtube_popout_player.user.js
// @include     http://*youtube.com/*
// @include     https://*youtube.com/*
// ==/UserScript==
!function(){(new YouTubePopoutPlayer).run()}();
var HTML5Player=function(){this.container=null,this.player=null,this.container=document.getElementById("movie_player")||document.getElementById("player"),this.container&&(this.player=this.container.getElementsByTagName("video")[0],this.player)};HTML5Player.prototype={constructor:HTML5Player,pause:function(){this.player&&this.player.pause()},remove:function(){this.container&&this.container.remove()},getWidth:function(){return this.player?this.player.clientWidth:null},getHeight:function(){return this.player?this.player.clientHeight:null},getTime:function(){return this.player?parseInt(this.player.currentTime,10):null}};
var YouTubePopoutPlayer=function(){this.defaults={width:854,height:480,startThreshold:5}};YouTubePopoutPlayer.prototype={constructor:YouTubePopoutPlayer,getVideoIDFromPlayer:function(t){var e=this.getVideoIDFromURL(t.baseURI);return e},getVideoIDFromURL:function(t){var e=null,n=new RegExp(/(?:(?:v=)|(?:\/embed\/)|(?:\/youtu\.be\/))([^\?\&\/]{11})/).exec(t);return n&&n[1]&&(e=n[1]),e},getPLaylistIDFromURL:function(t){var e=null,n=new RegExp(/list=((?:WL|[^\?\&\/]+))/).exec(t);return n&&n[1]&&(e=n[1]),e},insertControls:function(){this.insertContextMenuEntry(),this.insertPlayerControlsButton()},insertContextMenuEntry:function(){var t=document.getElementsByClassName("ytp-contextmenu")[0];if(!t)return!1;var e=t.getElementsByClassName("ytp-panel")[0].getElementsByClassName("ytp-panel-menu")[0],n=document.getElementById("popout-player-context-menu-item");if(n)return!1;(n=document.createElement("div")).className="ytp-menuitem",n.setAttribute("aria-haspopup",!1),n.setAttribute("role","menuitem"),n.setAttribute("tabindex",0),n.id="popout-player-context-menu-item";var o=document.createElement("div");o.className="ytp-menuitem-label",o.innerHTML="Popout Player";var r=document.createElement("div");r.className="ytp-menuitem-content",n.appendChild(o),n.appendChild(r),n.addEventListener("click",function(){this.onClick()}.bind(this),!1),e.appendChild(n);var s=document.getElementsByClassName("ytp-contextmenu"),i=s[s.length-1],a=i.getElementsByClassName("ytp-panel")[0],l=a.getElementsByClassName("ytp-panel-menu")[0],u=i.offsetHeight+n.offsetHeight;i.style.height=u+"px",a.style.height=u+"px",l.style.height=u+"px"},insertPlayerControlsButton:function(){var t=document.getElementsByClassName("ytp-right-controls")[0];if(!t)return!1;var e=t.getElementsByClassName("ytp-fullscreen-button")[0];if(!e)return!1;var n=t.getElementsByClassName("ytp-popout-button")[0];if(n)return!1;var o="http://www.w3.org/2000/svg",r="http://www.w3.org/1999/xlink",s=document.createElementNS(o,"svg");s.setAttribute("width","100%"),s.setAttribute("height","100%"),s.setAttribute("viewBox","0 0 36 36"),s.setAttribute("version","1.1");var i=document.createElementNS(o,"path");i.id="ytp-svg-pop-01",i.setAttributeNS(null,"d","m 8,8 v 20 h 20 v -6 h -2 v 4 H 10 V 10 h 4 V 8 Z"),i.setAttributeNS(null,"class","ytp-svg-fill");var a=document.createElementNS(o,"path");a.id="ytp-svg-pop-02",a.setAttributeNS(null,"d","M 28,8 H 18 l 3,3 -7,8 3,3 8,-7 3,3 z"),a.setAttributeNS(null,"class","ytp-svg-fill");var l=document.createElementNS(o,"use");l.setAttributeNS(null,"class","ytp-svg-shadow"),l.setAttributeNS(r,"href","#"+i.id);var u=document.createElementNS(o,"use");u.setAttributeNS(null,"class","ytp-svg-shadow"),u.setAttributeNS(r,"href","#"+a.id),s.appendChild(l),s.appendChild(i),s.appendChild(u),s.appendChild(a),(n=document.createElement("button")).className=["ytp-popout-button","ytp-button"].join(" "),n.id="popout-player-control-button",n.setAttribute("title","Popout Player"),n.appendChild(s),n.addEventListener("click",function(){this.onClick()}.bind(this),!1),t.insertBefore(n,e)},onClick:function(t){var e=new HTML5Player;e.pause();var n=this.getVideoIDFromPlayer(e.player)||this.getVideoIDFromURL(window.location.href),o=this.getPLaylistIDFromURL(window.location.href),r=e.getTime()||0;r<=this.defaults.startThreshold&&(r=0);var s={};null!=o&&(s.list=o),s.start=r,s.autoplay=1;var i={width:e.getWidth()||this.defaults.width,height:e.getHeight()||this.defaults.height,scrollbars:"no",toolbar:"no"};e.pause(),this.popoutPlayer(n,s,i)},popoutPlayer:function(t,e,n){var o="https://www.youtube.com/embed/"+t+"?";if(void 0!==e){for(var r in e)o+=r+"="+e[r]+"&";o=o.replace(/\&$/,"")}var s="";if(void 0!==n){for(var i in n)s+=i+"="+n[i]+",";s=s.replace(/\,$/,"")}window.open(o,t,s)},watchPageChange:function(){var t=this;new MutationObserver(function(e){e.forEach(function(e){if(null!=e.addedNodes)for(var n=0;n<e.addedNodes.length;n++)switch(e.addedNodes[n].className){case"ytp-popup ytp-contextmenu":t.insertContextMenuEntry();break;case"ytp-right-controls":t.insertPlayerControlsButton()}})}).observe(document.body,{childList:!0,subtree:!0})},run:function(){this.insertControls(),this.watchPageChange()}};