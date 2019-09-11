function SendLightCommand(command) {
    var commandObj = {
        emoojis: command
    };
    $.ajax({
        url: "http://localhost:3000/hue/groups/1",
        method: 'POST',
        data: commandObj,
        success: function(){
           // alert("whippee");
           $("#error-message").addClass('d-none');
        },
        error: function(){
            // alert("oops");
            $("#error-message").removeClass('d-none');

            var radio = $('#'+ command);
            radio[0].checked = false;
            radio.button("refresh");
        } 
    });
} //this function is sending an ajax request to the back end. This means we don't have to send a redirect everytime we get a button click to change the lights
