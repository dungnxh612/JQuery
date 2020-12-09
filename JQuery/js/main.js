$(document).ready(function () {
    var data = JSON.parse(dataJson);
    let positions = '';
    let offices = '';
    $.each(data.positions, function (sm, data) {
        positions += '<option value="' + data.id + '">' + data.name + '</option>';
    });
    $.each(data.offices, function (sm, data) {
        offices += '<option value ="' + data.id + '">' + data.name + '</option>';
    });
    $.each(data.users, function (key, value) {
        addRow(key, value);
    });

    $('#dataTable tbody').html(dataJson);
    $('.selectPositions').append(positions);
    $('.selectOffices').append(offices);
    $(this).find('.selectPositions').each(function (s) {
        var id = $(this).attr('data-id');
        var val = $(this).val(id);
        val.find("option[value=" + id + "]").attr('selected', true);
    });
    $(this).find('.selectOffices').each(function (s) {
        var id = $(this).attr('data-id');
        var val = $(this).val(id);
        val.find("option[value=" + id + "]").attr('selected', true);
    });

    $('#dataTable').on('click', 'tr', function () {
        var id = $(this).find('td:eq(0)').text();
        var name = $(this).find('td:eq(1)').text();
        var position = $(this).find('td:eq(2)').find('option:selected').text();
        var salary = $(this).find('td:eq(3)').find('input').val();
        var start_date = $(this).find('td:eq(4)').find('input').val();
        var office = $(this).find('td:eq(5)').find('option:selected').text();
        var extn = $(this).find('td:eq(6)').text();

        $('#nameDetail').val(name);
        $('#positionDetail').val(position);
        $('#salaryDetail').val(salary);
        $('#start_dateDetail').val(start_date);
        $('#officeDetail').val(office);
        $('#extnDetail').val(extn);
/*        $('#'+id).on('click',function () {
            $('dataTable tr').filter('.'+id+'').hide();
        });*/
    });
    $('#btnClear').on('click', function () {
        $('#idSearch').val('');
        $('#nameSearch').val('');
    });

    $('#btnSearch').on('click', function () {
        /*$.each(data.users, function (key, value) {
            if ($('#idSearch').val() == value.id || $('#idSearch').val() == "") {
                if (value.name.includes($('#nameSearch').val()) || $('#nameSearch').val() == "") {
                    alert(value.id + " " + value.name);
                }

            }
        });*/
        $.each($('#dataTable tbody tr'), function () {  
        if ($(this).find('td').eq(0).text().indexOf($('#idSearch').val().toLowerCase()) === -1) {
            $(this).hide();
        } else if ($(this).find('td').eq(1).text().toLowerCase().indexOf($('#nameSearch').val().toLowerCase()) === -1) {
            $(this).hide();
        } else {
            $(this).show();
        }
    })
    });

    $('#btnSave').on('click', function () {
        var data = new Array();
        $.each($('#dataTable tbody tr'), function () {
            var item = {
                id: $(this).find('td:eq(0)').text(),
                name: $(this).find('td:eq(1)').text(),
                position: $(this).find('td:eq(2)').find('option:selected').text(),
                salary: $(this).find('td:eq(3)').find('input').val(),
                started_date: $(this).find('td:eq(4)').find('input').val(),
                office: $(this).find('td:eq(5)').find('option:selected').text(),
                extn: $(this).find('td:eq(6)').text()
            };
            data.push(item);
        });
        console.log(data);
    });

    $('#dashboard').on('click', function () {
        location.reload();
    })
});

function addRow(key, value) {
    dataJson += '<tr>';
    dataJson += '<td>' + value.id + '</td>';
    dataJson += '<td>' + value.name + '</td>';
    dataJson += '<td> <select class="selectPositions" data-id="' + value.position + '"> </select></td>';
    dataJson += '<td> <input type="text" value="' + value.salary + '"></td>';
    dataJson += '<td> <input type="date" value="' + value.start_date + '"></td>';
    dataJson += '<td> <select class="selectOffices" data-id="' + value.office + '"> <select></td>';
    dataJson += '<td>' + value.extn + '</td>';
    dataJson += '<td> <button type="button" class="btn btn-danger" id="'+value.id+'">Delete</button></td>';
    dataJson += '</tr>';
}


