---
layout: post
title: Get YouTube Video Bookmarklet
categories: [technology, youtube, bookmarklet]
---

There's a few ways to download videos off of [YouTube][], my favorite is using a bookmarklet which injects a link onto the page to download the MP4 version of the video. The best of these bookmarklets was by someone over at the [Google System Blog][gsb], it was well maintained and all. Unfortunately, the post about their bookmarklet has been deleted, and as such, it hasn't been updated for the new video page layout YouTube switched to a few weeks back.

I took it upon myself to update the last version the GSB guys posted to work with the new layout, and it turned out to be dead simple. So without further ado, here's the bookmarklet:

<p class="thumbs">
    <a href="javascript:if(!document.getElementById('download-youtube-video')){var%20video_id=null;var%20video_hash=null;var%20video_player=document.getElementById('movie_player');if(video_player){var%20flash_variables=video_player.attributes.getNamedItem('flashvars');if(flash_variables){var%20flash_values=flash_variables.value;if(flash_values){var%20video_id_match=flash_values.match(/[^a-z]video_id=([^(\&|$)]*)/);if(video_id_match!=null)video_id=video_id_match[1];var%20video_hash_match=flash_values.match(/[^a-z]t=([^(\&|$)]*)/);if(video_hash_match!=null)video_hash=video_hash_match[1]}}}if(video_id==null||video_hash==null){var%20args=null;try{args=yt.getConfig('SWF_ARGS')}catch(e){}if(args){video_id=args['video_id'];video_hash=args['t']}}if(video_id!=null&&video_hash!=null){var%20div_embed=document.getElementById('watch-info');if(div_embed){var%20div_download=document.createElement('div');var%20div_download_code='%3Cbr%20/%3E%3Cspan%20id=\'download-youtube-video\'%3E%3Ca%20href=\''+'http://www.youtube.com/get_video?fmt=18&video_id='+video_id+'&t='+video_hash+'\'%20onclick=\'blur(this);\'%3EDownload%20as%20MP4%3C/a%3E';try{if(yt.getConfig('IS_HD_AVAILABLE'))div_download_code=div_download_code+'%20|%20%3Ca%20href=\''+'http://www.youtube.com/get_video?fmt=22&video_id='+video_id+'&t='+video_hash+'\'%20onclick=\'blur(this);\'%3EDownload%20as%20MP4%20HD%3C/a%3E'}catch(e){}div_download.innerHTML=div_download_code+'%3C/span%3E';div_embed.appendChild(div_download)}}}void(0)">Get YouTube Video</a>
</p>

To install the bookmarklet, simply drag the above link to your browsers bookmarks bar. To use it, simply open a YouTube video page and click the bookmarklet. You will get a link right above the "Like" button underneath the video saying *"Download as MP4"*. Simply right click on the link and select *"Save link as..."* or however your browser of choice is wording it.

I'll try to keep the above bookmarklet up to date as often as I can, or notice that I can't download videos anymore myself. So check back here if your bookmarklet stops working.


[youtube]: http://www.youtube.com/
[gsb]: http://googlesystem.blogspot.com/