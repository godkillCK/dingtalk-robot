const fetch = require('node-fetch');
const schedule = require('node-schedule');

const msg = {
    "markdown": {
        "title": "晨会提醒",
        "text": "![screenshot](http://pic.qiantucdn.com/58pic/17/63/30/56d58PICEDh_1024.jpg)"
    },
    "msgtype": "markdown",
    "at": {
        "atMobiles": [],
        "isAtAll": true
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
    fetch('https://oapi.dingtalk.com/robot/send?access_token=18f6e113a4ad9737f4c2b22e89bf7b0923f265d29800ed6afe70407f7f7dfb49', option);
}

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(1, 5)];
rule.hour = 9;
rule.minute = 58;

function job() {
    schedule.scheduleJob(rule, () => {
        post();
        console.log('提醒成功:' + new Date());
    }); 
}

job();