const fetch = require('node-fetch');
const schedule = require('node-schedule');

function getDay() {
    let iDays = parseInt(Math.abs(new Date().getTime() - new Date('2017-10-15').getTime()) / 1000 / 60 / 60 / 24);
    if (iDays >= 16) {
        iDays = iDays - 8;
    }
    return iDays;
};

const msg = {
    "markdown": {
        "title": "晨会提醒",
        "text": "距离钉签作品提交截止还有：" + getDay() + "天"
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