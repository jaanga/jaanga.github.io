var stats;

var debuginfo = {
    'Mouse': {
        'mouseX': '',
        'mouseY': '',
        'targetRotationX': '',
        'targetRotationY': ''
    },
    'Models': {},
    'Textures': {},
    'Stats': {}
}


function initDebug() {

    //print your list of debug items in html
    $('#debug').html(printDebugInfo(debuginfo));

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.getElementById('stats').appendChild(stats.domElement);

    //for debuging stats (update is a bit less frequent than using the update function)
    interval = setInterval(updateDebugInfo, 50);
}

function printDebugInfo(obj) {

    var str = '';

    $.each(obj, function (key, value) {
        str += "<div class='sidebar-widget'><h3>" + key + "</h3><div id='" + key.toLowerCase() + "'>";
        $.each(value, function (key, value) {
            
            str += key + ": " + '<span id=' + key + '>' + value + '</span><br>';
        });
        str += "</div></div>";
    });

    return str;
}

function updateDebugInfo()
{
//debuginfo.Mouse.mouseX = mouseX;
    $('#debug #mouseX').html(mouseX);
    $('#debug #mouseY').html(mouseY);
    $('#debug #targetRotationX').html(targetRotationX);
    $('#debug #targetRotationY').html(targetRotationY);

}




