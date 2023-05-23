function $(id) {
    return document.querySelector(id)
}
function hide(id) {
    $(id).style.display = 'none'
}
function show(id, display = 'block') {
    $(id).style.display = display
}

var currentChooseDay = getNow() // 当前选择的天

let CalorieData = {
    goal: {
        startDate: '2023-4-6',
        endDate: '2023-9-6',
        value: 2000
    },
    currentType: null,
    details: [
        { id: Date.now() - 20000, day: '2023-4-6', label: 'Lunch', calorie: 2000, flag: '+' },
        { id: Date.now(), day: '2023-5-6', label: 'Lunch', calorie: 3200, flag: '+' },
    ]
}

const str = localStorage.getItem("calorie_data")
if(str){
    CalorieData = JSON.parse(str)
}



$('#calculateId').addEventListener('click', function () {
    let BMR

    const A = $('#ageId').value
    const H = $('#heightId').value
    const W = $('#weightId').value

    const gender = $('input[name=gender]:checked').value
    if (gender == 'Male') {
        BMR = 10 * W + 6.25 * H - 5 * A + 5
    } else {
        BMR = 10 * W + 6.25 * H - 5 * A - 161
    }

    const maintainWeight = BMR + Number($('#levelId').value)
    const weightLoss = (maintainWeight * 0.8).toFixed(0)
    const weightGain = (maintainWeight * 1.2).toFixed(0)

    $('#weightLossId').innerHTML = weightLoss + ' kcal/day'
    $('#maintainWeightId').innerHTML = maintainWeight + ' kcal/day'
    $('#weightGainId').innerHTML = weightGain + ' kcal/day'

    hide('.top')
    show('.top1', 'flex')
})

// click set goal button
$('#openGoalDialogId').addEventListener('click', function () {
    show('.goal-dialog')
})

// delete goal
$('.delete-goal-btn').addEventListener('click', function () {
    CalorieData.goal = null
    render()
})

// 删除detail
$('.bottom .center .detail').addEventListener('click', e => {
    if (e.target.className == 'delete-detail-btn') {
        for (let i = 0; i < CalorieData.details.length; i++) {
            if (e.target.dataset.id == CalorieData.details[i].id) {
                CalorieData.details.splice(i, 1)
                render()
                return
            }
        }
    }
})

// click calender
$('.calendar .body').addEventListener('click', e => {
    const day = e.target.dataset.day
    if (day) {
        currentChooseDay = day
        render()
    }
})

function changeType(type) {
    CalorieData.currentType = type

    hide('.type-meal')
    hide('.type-activity')
    hide('.type-bmr')

    if (type == 'Meal') {
        show('.type-meal')
    } else if (type == 'Activity') {
        show('.type-activity')
    } else if (type == 'BMR') {
        show('.type-bmr')
    }
}

function getNow() {
    const d = new Date()
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDay()
}
function getMonth(){
    const d = new Date()
    return d.getFullYear() + '-' + (d.getMonth() + 1)
}

$('#addDetail').addEventListener('click', function(){
     if (CalorieData.currentType == 'Activity') {
        CalorieData.details.push({
            id: Date.now(),
            day: getNow(),
            label: $('.type-activity select').value,
            calorie: Number($('.type-activity input').value),
            flag: '-'
        })
    } else if (CalorieData.currentType == 'BMR') {
        CalorieData.details.push({
            id: Date.now(),
            day: getNow(),
            label: 'BMR',
            calorie: Number($('.type-bmr input').value),
            flag: '-'
        })
    }else {
         CalorieData.details.push({
             id: Date.now(),
             day: getNow(),
             label: $('.type-meal select').value,
             calorie: Number($('.type-meal input').value),
             flag: '+'
         })
     }
    render()
})


// save goal
$('#setId').addEventListener('click', function () {
    hide('.goal-dialog')

    CalorieData.goal = {
        startDate: $('#startDateId').value,
        endDate: $('#endDateId').value,
        value: Number($('#targetValueId').value)
    }

    render()
})

function render() {
    // 目标展示
    let dom = $('.bottom .left .goal')
    if (CalorieData.goal) {
        dom.style.display = 'flex'
        $('#goal_start_date').innerHTML = 'Start Date: ' + CalorieData.goal.startDate
        $('#goal_end_date').innerHTML = 'End Date: ' + CalorieData.goal.endDate
        $('#goal_value').innerHTML = 'Daily Goal: ' + CalorieData.goal.value + ' Calories'
        $('#render_target_calorie').innerHTML = CalorieData.goal.value
    } else {
        dom.style.display = 'none'
        $('#render_target_calorie').innerHTML = 0
    }


    // 日历展示
    const d = new Date()
    const month = d.getMonth() + 1
    let dayNum = 31
    if (month == 2) {
        dayNum = 28
    } else if ([4, 6, 9, 11].includes(month)) {
        dayNum = 30
    }

    dom = $('.calendar .body')
    const days = []
    for (let i = 1; i < dayNum + 1; i++) {
        const day = d.getFullYear() + '-' + month + '-' + i
        days.push(`<div data-day='${day}'>${i}</div>`)
    }
    dom.innerHTML = days.join('')


    // detail展示,并且只展示今天的
    const someDayDetail = CalorieData.details.filter(x => {
        return x.day == currentChooseDay
    })
    $('.bottom .center .detail').innerHTML = someDayDetail.map(x => {
        return `<div class="item">
                    <div>${x.label}</div>
                    <div>${x.flag}${x.calorie} Calories</div>
                    <div class="delete-detail-btn" data-id='${x.id}'>[x]</div>
                </div>`
    }).join('')

    // 今天的卡路里数值展示
    let todayCalorie = 0
    someDayDetail.forEach(x => {
        if (x.flag == '+') {
            todayCalorie += x.calorie
        } else {
            todayCalorie -= x.calorie
        }
    })
    $('#render_today_calorie').innerHTML = todayCalorie
    $('#render_today').innerHTML = currentChooseDay
    $('#render_month').innerHTML = getMonth()


    // save the data to the user's browser
    localStorage.setItem("calorie_data", JSON.stringify(CalorieData))
}

render()
