# bookinglite
<img src="https://travis-ci.org/mathieu166/bookinglite.svg?branch=master"/>

Todo:
On the calendar ajax version: 
- for UI optimization, when loading the calendar, send a first ajax request for the display of the month title header and then one for the content.
  * This will let the user click multiple time on the Next or Previous button with fast response. *
- Keep track of the request sent to the server so that if multiple request are sent before the response gets back, only render the last request.
