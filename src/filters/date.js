var DateDiff = function (type, start, end) {
  let // or var
    years = end.getFullYear() - start.getFullYear(),
    monthsStart = start.getMonth(),
    monthsEnd = end.getMonth()
  var returns = -1

  switch (type) {
    case 'm':
    case 'mm':
    case 'month':
    case 'months':
      returns =
        Math.floor(years * 12 - (12 - monthsEnd) + (12 - monthsStart)) +
        ' месяцев назад'
      break
    case 'y':
    case 'yy':
    case 'year':
    case 'years':
      returns = years + ' лет назад'
      break
    case 'd':
    case 'dd':
    case 'day':
    case 'days':
      returns =
        Math.floor((end - start) / (1000 * 60 * 60 * 24)) + ' дней назад'
      break
  }

  return returns
}

export default function dateFilter(value) {
  return DateDiff('dd', new Date(value), new Date())
}
