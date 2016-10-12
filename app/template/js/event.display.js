function reposition() {
  $('div[class=event]').each(function() {
    var div = $(this);
    var parentTd = div.closest('td');

    var width = parentTd.outerWidth(true);
    var days = div.attr("days");

    var currentTd = parentTd;
    var totalWidth = 0;
    for (i = 0; i < days; i++) {
      totalWidth = totalWidth + currentTd.outerWidth();
      currentTd = currentTd.next();
    }
    div.closest('span').css("width", (totalWidth - 1) + "px");
    div.css("left", parentTd.width() / 2);
    div.css("width", (totalWidth - 1) + "px");
  });
}