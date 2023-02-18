$(document).ready(function () {
  var day = moment().format(" MMMM Do, YYYY, h:mm:ss");
  setInterval(() => {
    day = moment().format(" MMMM Do, YYYY, h:mm:ss");
    $("#today").text(day);
  }, 1000);

  var currentDayHours = [8, 9, 10, 11, 12, 13, 14, 15, 16];

  for (var i = 0; i < currentDayHours.length; i++) {
    var recentHour = moment().format("H");

    var DivEl = $("<div class='RowEl'>");
    var elForm = $("<form>");
    var ColumnEl1 = $("<div class='group-prepend hour'>");
    var columnEL2 = $("<input class='form-control input'>");
    var columnEl3 = $(
      "<button class= 'group-append saveButton' type='submit'>"
    );

    var inputValue = localStorage.getItem(currentDayHours[i]);
    columnEL2.attr("value", inputValue);

    ColumnEl1.attr("id", "time" + currentDayHours[i]);
    columnEL2.attr("id", currentDayHours[i]);
    columnEl3.attr("id", "button" + currentDayHours[i]);

    var heading3 = $("<h3>");
    heading3.text(currentDayHours[i] + "am");

    var heading4 = $("<h4>");
    heading4.text("Save");

    if (currentDayHours[i] >= 12) {
      heading3.text(currentDayHours[i] + "pm");

      if (currentDayHours[i] >= 13) {
        heading3.text(currentDayHours[i] - 12 + "pm");
      }
    }

    ColumnEl1.append(heading3);
    columnEl3.append(heading4);
    elForm.append(ColumnEl1, columnEL2, columnEl3);
    DivEl.append(elForm);
    $("#column").append(DivEl);

    if (currentDayHours[i] === parseInt(recentHour)) {
      ColumnEl1.attr("class", "group-prepend hour present");
      columnEl3.attr("class", "input-group-append saveButton present");
    } else if (currentDayHours[i] <= parseInt(recentHour)) {
      ColumnEl1.attr("class", "input-group-prepend hour past");
      columnEl3.attr("class", "input-group-append saveButton past");
    } else if (currentDayHours[i] >= parseInt(recentHour)) {
      ColumnEl1.attr("class", "input-group-prepend hour future");
      columnEl3.attr("class", "input-group-append saveButton future");
    }
  }
  $("form").on("submit", function (e) {
    e.preventDefault();

    const time = e.target.querySelector("input").getAttribute("id");
    const text = e.target.querySelector("input").value;
    window.localStorage.setItem(time, text);
  });
});
