var app = app || {};

app.home = { // main jQuery module
	
	init : function() {

        this.initiate.init();
        this.manageV0.init();
        this.manageV1.init();
        this.manageV2.init();
        this.manageV3.init();
        this.managePopup.init();

    },

    blynkUrl : 'http://blynk-cloud.com/26d5fb1bc7514e218718f94a868d8a6f/',

    isArduinoRunning : false,

    lastDetectedMotion : null,

    isAlarmActivate : false,

    adminEmail : 'hugo@heropolis.fr',
    
    initiate : { // initialisation
        
        init : function() {

            $(document).on('click', '#header_logo, #footer_logo', function() { // refresh site on logo click

                window.location.href = window.location.href;

            });

            $(document).on('click', '#alarm-btn', function() { // toggle alarm

                if ($(this).is(':checked')) {
                    sessionStorage.setItem('alarm', 'alarm');
                    app.home.isAlarmActivate = true;
                } else {
                    sessionStorage.removeItem('alarm');
                    app.home.isAlarmActivate = false;
                }

            });

            $(document).on('click', '#check-detection-btn', function() { // check if motion detected during last x minutes

                var val = $('#check-minutes-val').val();
                if (val) {
                    $('.check-detection-dependence').each(function() {
                        $(this).removeClass('none');
                    });
                    var today = new Date();
                    var hours = today.getHours();
                    var minutes = today.getMinutes();
                    var seconds = today.getSeconds();
                    if (hours   < 10) {hours   = "0"+hours;}
                    if (minutes < 10) {minutes = "0"+minutes;}
                    if (seconds < 10) {seconds = "0"+seconds;}
                    var current = hours+":"+minutes+":"+seconds;
                    var diffMs = Date.parse('01/01/2001 '+current) - Date.parse('01/01/2001 '+app.home.lastDetectedMotion);
                    var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
                    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                    diffMins = diffMins + diffHrs * 60;
                    if (diffMins > 0 && val >= diffMins) {
                        $('#detected-state').removeClass('nok-state');
                        $('#detected-state').addClass('ok-state');
                        $('.detection-ok-dependence').each(function() {
                            $(this).removeClass('none');
                        });
                    } else {
                        $('#detected-state').removeClass('ok-state');
                        $('#detected-state').addClass('nok-state');
                        $('.detection-ok-dependence').each(function() {
                            $(this).addClass('none');
                        });
                    }
                } else {
                    app.home.managePopup.display("Check Motion", "Error please enter a value for minutes.", "glyphicon-remove-circle");
                    $('.check-detection-dependence').each(function() {
                        $(this).addClass('none');
                    });
                }

            });

            $(document).on('click', '#launch-alert-btn', function() { // manually launch an alert

                app.home.manageAlarm.launch();

            });

            // app.home.manageAlarm.launch();

        }

    },

    manageV0 :  { // V0 last detected motion  --> hour:min:sec

        init : function() {

            if (app.home.isArduinoRunning) {

                $.ajax(app.home.blynkUrl + 'get/V0', {
                    type: 'GET',
                    success: function(data) {
                        // console.log("V0", data);
                        app.home.lastDetectedMotion = data[0];
                    }, error: function(err) {
                        // console.log("V0 err", err);
                        app.home.manageV0.init();
                    }
                });

            } else {

                setTimeout(function() {
                    app.home.manageV0.init();
                }, 500);

            }

        }

    },

    manageV1 :  { // V1 motion --> boolean

        init : function() {

            if (app.home.isArduinoRunning) {

                $.ajax(app.home.blynkUrl + 'get/V1', {
                    type: 'GET',
                    success: function(data) {
                        // console.log("V1", data);
                        if (data[0] == "1") {
                            $('#motion-state').removeClass('nok-state');
                            $('#motion-state').addClass('ok-state');
                            if (app.home.isAlarmActivate) {
                                app.home.manageAlarm.launch();
                            }
                        } else {
                            $('#motion-state').removeClass('ok-state');
                            $('#motion-state').addClass('nok-state');
                        }
                        setTimeout(function() {
                            app.home.manageV1.init();
                        }, 500);
                    }, error: function(err) {
                        // console.log("V1 err", err);
                        app.home.manageV1.init();
                    }
                });

            } else {

                setTimeout(function() {
                    app.home.manageV1.init();
                }, 500);

            }

        }

    },

    manageV2 :  { // V2 light level --> 1 to 10

        init : function() {

            if (app.home.isArduinoRunning) {

                $.ajax(app.home.blynkUrl + 'get/V2', {
                    type: 'GET',
                    success: function(data) {
                        // console.log("V2", data);
                        $('#light-level').attr('value', data[0]);
                        setTimeout(function() {
                            app.home.manageV2.init();
                        }, 500);
                    }, error: function(err) {
                        // console.log("V2 err", err);
                        app.home.manageV2.init();
                    }
                });

            } else {

                setTimeout(function() {
                    app.home.manageV2.init();
                }, 500);

            }

        }

    },

    manageV3 :  { // V3 timer --> int

        init : function(previousVal = null) {

            $.ajax(app.home.blynkUrl + 'get/V3', {
                type: 'GET',
                success: function(data) {
                    // console.log("V3", data);
                    if (previousVal) {
                        if (previousVal != data[0]) {
                            if (!app.home.isArduinoRunning) {
                                app.home.manageV3.showAllArduinoDep();
                            }
                        } else {
                            if (app.home.isArduinoRunning) {
                                app.home.manageV3.hideAllArduinoDep();
                            }
                        }
                        setTimeout(function() {
                            app.home.manageV3.init();
                        }, 1000);
                    } else {
                        setTimeout(function() {
                            app.home.manageV3.init(data[0]);
                        }, 3000);
                    }
                }, error: function(err) {
                    // console.log("V3 err", err);
                    app.home.manageV3.init();
                }
            });

        },

        showAllArduinoDep : function() {

            app.home.isArduinoRunning = true;
            $('#arduino-state').removeClass('nok-state');
            $('#arduino-state').addClass('ok-state');
            $('.arduino-states-dependence').each(function() {
                $(this).removeClass('none');
            });
            if (sessionStorage.getItem('alarm') == 'alarm') {
                $('#alarm-btn').click();
            }

        },

        hideAllArduinoDep : function() {

            app.home.isArduinoRunning = false;
            $('#arduino-state').removeClass('ok-state');
            $('#arduino-state').addClass('nok-state');
            $('.arduino-states-dependence').each(function() {
                $(this).addClass('none');
            });
            
        }

    },

    manageAlarm : { // manage alarm (send mail + display popup on motion detected)

        launch : function() {

            $.ajax(app.home.blynkUrl + 'email', {
                type: 'POST',
                contentType: "application/json",
                data : {
                    to : app.home.adminEmail,
                    title: "Motion Detection",
                    subj: "An alert has been received on your system, please go there to verify."
                },
                header : 'Access-Control-Allow-Origin: *',
                crossDomain: true,
                success: function(data) {
                    // console.log("Email", data);
                    app.home.managePopup.display("Alert Success", "An email has been successfully sent to : "+app.home.adminEmail+".", "glyphicon-ok-circle");
                }, error: function(err) {
                    // console.log("Email err", err);
                    app.home.managePopup.display("Alert Failed", "Error trying to send an email to : "+app.home.adminEmail+".", "glyphicon-remove-circle");
                }
            });

        }

    },

    managePopup : { // manage popups
        
        init : function() {

            $(document).on('click', "#bgBlackHome", function(e) {

                app.home.managePopup.hide();

            });

            $(document).on('click', "#btnOkPopupHome", function(e) {

                app.home.managePopup.hide();

            });

        },

        display : function(title, msg, icon, okButton = true) {

            if (!okButton) {
                $('#btnOkPopupHome').css('visibility', 'hidden');
            }
            $("#titlePopupHome").html(title);
            $("#contentPopupHome").html(msg);
            $("#iconPopupHome").addClass(icon);
            $("#popupHome").removeClass("none");
            $("#bgBlackHome").removeClass("none");
            

        },

        hide : function() {

            $("#popupHome").addClass('none');
            $("#bgBlackHome").addClass('none');
            $("#iconPopupHome").attr('class', 'glyphicon');
            $('#btnOkPopupHome').css('visibility', 'visible');

        }

    }

};

app.home.init(); // initialisation of all modules