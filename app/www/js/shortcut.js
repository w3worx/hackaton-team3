function presentShortcut(shortcut, callbackFn) {
    var shortcutId = shortcut.persistentIdentifier;

    cordova.plugins.SiriShortcuts.present(
        shortcut,
        function() {
            console.log(shortcutId + ' presented');

            callbackFn();
        },
        function(error) {
            console.log(shortcutId + ' present error', error);

            donateShortcuts();
        }
    );
}

function donateShortcut(shortcut, callbackFn) {
    var shortcutId = shortcut.persistentIdentifier;

    cordova.plugins.SiriShortcuts.donate(
        shortcut,
        function() {
            console.log(shortcutId + ' donated');

            presentShortcut(shortcut, callbackFn);
        },
        function(error) {
            console.log(shortcutId + ' donated error', error);

            donateShortcuts();
        }
    ); 
}

window.donateShortcut = donateShortcut;

function searchBeaconForPlanning() {
    searchBeacon(function(beacon){
        $(document).ready(function(){
            $.post( "https://hackaton.w3worx.nl/team3/index.php?action=getBeacon",
                { uuid: beacon.uuid, major : beacon.major , minor : beacon.minor }, function(result){
                    if(result){
                        result = JSON.parse(result);

                        if(result.length) {
                            result = result[0];
                        } else {
                            result = false;
                        }

                        $.post( "https://hackaton.w3worx.nl/team3/index.php?action=getPlanning",
                            { beaconId: result.id, userId : 1 }, function(result){
                                result = JSON.parse(result);

                                if(result.length) {
                                    result = JSON.stringify(result[0]);
                                } else {
                                    result = false;
                                }
                                
                                if(result){
                                    window.location = "planning.html?planning=" + result;
                                } else {
                                    console.log('Result error: ', result);
                                }
                            });
                    } else {
                        console.log('Result error: ', result);
                    }
                });
            });
    });
}

function getActivatedShortcut() {
    cordova.plugins.SiriShortcuts.getActivatedShortcut(
        {},
        function(shortcut) {
            if(shortcut) {
                var shortcutId = shortcut.persistentIdentifier;

                if(shortcutId === 'check-me-in') {
                    searchBeaconForPlanning();
                } 
                else if(shortcutId === 'check-me-out') {
                    console.log('Check out user');
                }
            }
        },
        function(error) {
            console.log('error', error);
        }
    );
}