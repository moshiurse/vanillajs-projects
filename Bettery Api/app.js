const batteryCharge = document.getElementById('status');
const batteryStatusColor = document.getElementById('color');
const chargeStatus = document.getElementById('charge-status');
const chargeOrNotStatus = document.getElementById('charge-or-not-status');

let batteryPromise = navigator.getBattery();

function getColor(charge) {
    if(charge == 100) {
        return 'blue';
    }else if(charge > 70) {
        return 'green';
    }else if(charge > 30) {
        return 'yellow';
    }else {
        return 'red';
    }
}

    function changeBatteryStatus(battery) {
        batteryCharge.innerHTML = `${battery.level * 100}%`;
        batteryStatusColor.style.width = `${(battery.level * 100)}%`;
        batteryStatusColor.style.backgroundColor = getColor(battery.level * 100);
        document.title = `${battery.level * 100}% Charge`;
    }

let myBattery = undefined;
batteryPromise.then(battery => {
    console.log(battery);
    myBattery = battery;
    changeBatteryStatus(battery);
    chargeStatus.innerHTML = `${battery.charging != Infinity ? `Device Is now charging` : `Device Charger Plugged Out`}`;
    chargeOrNotStatus.innerHTML = `${battery.chargingTime != Infinity ? `DisChargig Time : ${this.dischargingTime}` : ''}`;

    battery.onlevelchange = function() {
        console.log(this.level);
        batteryCharge.innerHTML = `${this.level * 100}%`;
    }

    battery.onchargingchange =  function() {
        console.log('onchargingchange');
        chargeOrNotStatus.innerHTML = `${this.chargingTime ? `Chargig Time : ${this.chargingTime}` : ``}`;
    }
    battery.ondischargingtimechange= function() {
        console.log('ondischargingtimechange');
        chargeOrNotStatus.innerHTML = `${this.chargingTime ? `DisChargig Time : ${this.dischargingTime}` : ``}`;
    }
    battery.onchargingtimechange = function() {
        console.log('chargingtimechange', this);
    }

});