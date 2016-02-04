# youtube-kodi-webinterface

Youtube webinterface for Kodi.

<img src="https://media.giphy.com/media/l2JIhtfEBkGeAwK1a/giphy.gif" width="240" height="359">

I did it for myself to try ReactJs + Redux for the first time on a real app, so don't expect it to be perfect.
Could be usefull during parties, give your guests your WiFi access and the webinterface URL so they can
add music videos.

Require Youtube addon to work. (http://kodi.wiki/view/Add-on:YouTube)

Features:
 - Search videos and playlists on Youtube and add them to your Kodi's playlist.
 - Manage your video playlist (remove and goto item).
 - Volume control, play, pause, stop, clear playlist and open player.
 - Video added from Youtube Application will show up correctly.

Try in local:
 - You need nodejs and npm installed to try it in local
 - 'npm install' to install all dependencies
 - 'npm start' to start server.
 - Edit utils/Config.js file with your Youtube api key and Kodi's ip/ports.

Installation (Looking for an easier way):

 - First you will need a Youtube API key for this to work. Go to https://console.cloud.google.com/ and get one here.
 - Then download the zip file and install it on Kodi like any other zip addons.
 - Connect with SSH or open a Terminal on your Kodi.
 - Locate the addons directory (for osmc the path is: /home/osmc/.kodi/addons/webinterface.ywifk)
 - open bundle.js and search for "apiKey", then past your Youtube API here
 - Next to the youtube api key you will need to enter your Kodi ip (I recommand to have a static ip), port (default should be 80 or 8080) and websocket port (default should be 9090).
- IF you installed other webinterfaces you should be able to access to YWIFK with this URL: http://your.kodi.ip:port/addons/webinterface.ywifk/ 

How it works:

 - To to the search tab to browse Youtube's videos, click on the result to add it on the playlist.
 - Then go back to the playlist Tab and click on the power button to open the video player with the playlist.
 - You can continue to add videos when the player is running.

Know issues:
 - Can broke if you have videos on your playlist added by other application than this webinterface or Youtube.

Tested on OSMC running on a Raspberry 2.

Thanks to Apercu who provide me a nice starter with webpack etc...
