$(document).ready(function () {
    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: "/mainapp/all_events",
        selectable: true,
        selectHelper: true,
        editable: true,
        eventLimit: true,
        select: function () { //redirect user to create potluck
            window.location.href = "/mainapp/create"
        },

        eventClick: function (event) { //redirect user to selected potluck

            window.location.href = "/mainapp/potluck/" + event.id;

        },

    });
});