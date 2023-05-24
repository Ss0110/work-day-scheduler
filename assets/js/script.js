$(function () {
  $(".saveBtn").on("click", function () {
    var timeBlock = $(this).closest(".time-block");
    var hourId = timeBlock.attr("id");
    var userInput = timeBlock.find(".description").val();

    localStorage.setItem(hourId, userInput);
  });

  $("#clear-all").on("click", function () {
    $("textarea").val("");
    $("ul").empty();
    $(".time-block").each(function () {
      var hourId = $(this).attr("id");
      localStorage.removeItem(hourId);
    });
  });

  var currentHour = dayjs().format("H");

  $(".time-block").each(function () {
    var hourBlock = parseInt($(this).attr("id").split("-")[1]);

    if (hourBlock < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (hourBlock == currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  $(".time-block").each(function () {
    var hourId = $(this).attr("id");
    var userInput = localStorage.getItem(hourId);

    if (userInput) {
      $(this).find(".description").val(userInput);
    }
  });

  var currentDate = dayjs().format("dddd, MMM D, YYYY");
  $("#current-date").text(currentDate);
});
