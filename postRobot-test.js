const fetch = require('node-fetch');
const schedule = require('node-schedule');

const msg = {
    "markdown": {
        "title": "test",
        "text": "每隔30s处罚"
    },
    "msgtype": "markdown",
    "at": {
        "atMobiles": [],
        "isAtAll": false
    }
};

const option = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(msg)
};

function post() {
    fetch('https://oapi.dingtalk.com/robot/send?access_token=65f52709b03dd31c05593ff50813c0b418335c9b32883c2c7e631ed96eb9e50d', option);
}

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(1, 5)];
rule.hour = 9;
rule.minute = 58;

function job() {
    schedule.scheduleJob('30 * * * * *', () => {
        post();
        console.log('提醒成功:' + new Date());
    }); 
}

job();