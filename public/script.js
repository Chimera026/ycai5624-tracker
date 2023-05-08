function $(id) {
    return document.querySelector(id)
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
    const weightLoss = maintainWeight * 0.8
    const weightGain = maintainWeight * 1.2

    $('#weightLossId').innerHTML = weightLoss + ' kcal/day'
    $('#maintainWeightId').innerHTML = maintainWeight + ' kcal/day'
    $('#weightGainId').innerHTML = weightGain + ' kcal/day'

    $('.top').style.display = 'none'
    $('.top1').style.display = 'flex'
})

// click set goal button
$('#openGoalDialogId').addEventListener('click', function () {
    $('.goal-dialog').style.display = 'block'
})

// save goal 
$('#setId').addEventListener('click', function () {
    $('.goal-dialog').style.display = 'none'
})
