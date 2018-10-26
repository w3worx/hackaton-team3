function searchBeacon(callbackFn) {
    var delegate = new cordova.plugins.locationManager.Delegate();

    delegate.didDetermineStateForRegion = function (pluginResult) {
        console.log(pluginResult);
    };

    delegate.didStartMonitoringForRegion = function (pluginResult) {
        console.log(pluginResult);
    };

    delegate.didRangeBeaconsInRegion = function (pluginResult) {
        var beacons = pluginResult.beacons;

        function orderByAccuracy(a,b) {
            if (a.accuracy < b.accuracy)
                return -1;
            if (a.accuracy > b.accuracy)
                return 1;
            return 0;
        }

        if(beacons && beacons.length > 0) {  
            beacons = beacons.sort(orderByAccuracy);

            var currentBeacon = beacons[0];

            callbackFn(currentBeacon);

            cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
                .fail(function(e) { console.error(e); })
                .done();
        }
    };

    var uuid = '23a01af0-232a-4518-9c0e-323fb773f5ef';
    var identifier = 'beacon';
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);

    cordova.plugins.locationManager.setDelegate(delegate);

    // required in iOS 8+
    cordova.plugins.locationManager.requestWhenInUseAuthorization();
    // or cordova.plugins.locationManager.requestAlwaysAuthorization()

    cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
        .fail(function(e) { console.error(e); })
        .done();
}