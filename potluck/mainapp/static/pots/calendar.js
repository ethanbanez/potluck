$(document).ready(function () {
    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: "{% url 'mainapp:all_events' %}",
        selectable: true,
        selectHelper: true,
        editable: true,
        eventLimit: true,
        select: function (start, end, allDay) {
            var title = prompt("Enter Event Title");
            if (title) {
                var start = $.fullCalendar.formatDate(start, "Y-MM-DD HH:mm:ss");
                var end = $.fullCalendar.formatDate(end, "Y-MM-DD HH:mm:ss");
                $.ajax({
                    type: "GET",
                    url: "{% url 'mainapp:all_events' %}",
                    data: {'title': title, 'start': start, 'end': end},
                    dataType: "json",
                    success: function (data) {
                        calendar.fullCalendar('refetchEvents');
                        alert("Added Successfully");
                    },
                    error: function (data) {
                        alert('There is a problem!!!');
                    }
                });
            }
        },

        eventClick: function (event) {
            if (confirm("You've selected this potluck!")) {
                var id = event.id;
                $.ajax({
                    type: "GET",
                    url: '/remove',
                    data: {'id': id},
                    dataType: "json",
                    success: function (data) {
                        calendar.fullCalendar('refetchEvents');
                        alert('Event Removed');
                    },
                    error: function (data) {
                        alert('Cool!!!');
                    }
                });
            }
        },

    });
});