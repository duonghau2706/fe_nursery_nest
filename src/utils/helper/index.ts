import dayjs from 'dayjs'
import moment from 'moment'

interface ICleanObject {
  label: string
  value: string
}

type CleanObjectArray = ICleanObject[]

const cleanObj = (obj: any) => {
  const newObj = { ...obj }
  for (const propName in newObj) {
    if (
      newObj[propName] === null ||
      newObj[propName] === undefined ||
      newObj[propName] === ''
    ) {
      delete newObj[propName]
    }
  }
  return newObj
}

const handleCurrentPage: any = (paramCurrent: number, paramPerPage: number) => {
  return ((paramCurrent - 1) * paramPerPage + 1)?.toLocaleString()
}

const handleCurrentPageNew = (
  totalRecord: any,
  currentPage: number,
  perPage: number
) => {
  const numberItemPage = perPage + +handleCurrentPage(currentPage, perPage) - 1
  if (totalRecord && numberItemPage < totalRecord) return numberItemPage
  return totalRecord?.toLocaleString()
}

const cleanObject = (listData: CleanObjectArray) => {
  // Xóa các bản ghi có giá trị null và ''
  const filteredData = listData.filter(
    (item: any) =>
      item.label !== null &&
      item.value !== null &&
      item.label !== '' &&
      item.value !== ''
  )

  // Xóa các bản ghi trùng nhau
  const uniqueData = filteredData.filter(
    (item: any, index: any, self: any) =>
      index ===
      self.findIndex(
        (t: any) => t.label === item.label && t.value === item.value
      )
  )
  return uniqueData
}

const renderService = (number: number) => {
  switch (number) {
    case 0:
      return 'Di động'
    case 1:
      return 'Cơ bản'
    case 2:
      return 'Tiêu chuẩn'
    case 3:
      return 'Cao cấp'
    default:
      return
  }
}

const renderInputBank = (index: any) => {
  switch (index) {
    case 0:
      return 'Vietcombank'
    case 1:
      return 'Techcombank'
    case 2:
      return 'TPBank'
    case 3:
      return 'VietinBank'
    case 4:
      return 'VIB'
    case 5:
      return 'HDBank'
    case 6:
      return 'Agribank'
    case 7:
      return 'BIDV'
    case 8:
      return 'MB Bank'
    case 9:
      return 'Sacombank'
    case 10:
      return 'SHB'
    case 11:
      return 'VPBank'
    case 12:
      return 'LienVietPostBank'
    case 13:
      return 'GPBank'
    default:
      return
  }
}

const createDayjsFromDMY = (text: any) => {
  //30/05/2022 -> 2022-05-30T00:00:00.000Z
  return dayjs(`${reverseStringDay(text)}T00:00:00.000Z`.replaceAll('/', '-'))
}

const createTimeStampFromMoment = (text: any) => {
  return text.format('YYYY-MM-DD HH:mm:ss.SSS')
}

const createStartDateTimeStampFromMoment = (text: any) => {
  return text.startOf('day').format('YYYY-MM-DD HH:mm:ss.SSS')
}

const createEndDateTimeStampFromMoment = (text: any) => {
  return text.endOf('day').format('YYYY-MM-DD HH:mm:ss.SSS')
}

const createStartDateDbFromOnlyYear = (year: number) => {
  return `${year}/01/01`
}

const createEndDateDbFromOnlyYear = (year: number) => {
  return `${year}/12/31`
}

const reverseStringDay = (text: any) => {
  //01/02/2023 -> 2023/02/01
  const arr = text?.split('/')
  return arr[2] + '/' + arr[1] + '/' + arr[0]
}

const renderDateStringYear = (text: string, sig: any) => {
  //2023/01/01
  const arr = text?.split(sig)
  const year = arr?.[0]
  const month = arr?.[1]
  const day = arr?.[2].substring(0, 2)
  return `${day}/${month}/${year}`
}

const renderDateStringDay = (text: any, sig: any) => {
  //1/1/2023
  if (text === undefined || text === null || !text.includes('/')) return text

  const arr = text?.split(sig)
  const day = arr?.[0].length === 1 ? '0' + arr?.[0] : arr?.[0]
  const month = arr?.[1]?.length === 1 ? '0' + arr?.[1] : arr?.[1]
  const year = arr?.[2]
  return `${day}/${month}/${year}`
}

const renderTimeOct = (text: string) => {
  //2023-11-17 18:28:13.034+07
  const arr = text.split(':')
  const hh = arr[0].substring(arr?.[0]?.length - 2, arr?.[0]?.length)
  const ss = arr[2].substring(0, 2)

  return `${hh}:${arr[1]}:${ss}`
}

const addOneMonthToMoment = (dateMoment: any) => {
  const curMonth = moment(dateMoment).month()
  let monthShouldAdd = 30
  if (
    curMonth === 0 ||
    curMonth === 2 ||
    curMonth === 4 ||
    curMonth === 6 ||
    curMonth === 7 ||
    curMonth === 9 ||
    curMonth === 11
  ) {
    monthShouldAdd = 31
  } else if (
    curMonth === 3 ||
    curMonth === 5 ||
    curMonth === 8 ||
    curMonth === 10
  ) {
    monthShouldAdd = 30
  } else {
    const year = moment(dateMoment).year()

    if (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    ) {
      monthShouldAdd = 29
    } else {
      monthShouldAdd = 28
    }
  }

  const addMonth = moment(dateMoment)
    .add(monthShouldAdd, 'days')
    .format('YYYY-MM-DD HH:mm:ss.SSS')
  return addMonth
}

const getUnique = (arr: any) => {
  return arr.filter(
    (value: any, index: any, array: any) => array.indexOf(value) === index
  )
}

const create_UUID = () => {
  let dt = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    }
  )
  return uuid
}

const create_CODE = () => {
  let dt = new Date().getTime()
  const uuid = 'xxxyxxyxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid.toUpperCase()
}

const create_ORDER_CODE = () => {
  let dt = new Date().getTime()
  const orderCode = '1xxyxxyxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 10) % 10 | 0
    dt = Math.floor(dt / 10)
    return (c == 'x' ? r : r & 0x3).toString(10)
  })
  return orderCode
}

const searchListMovie = (listMovie: any, input: string) => {
  const text = input ?? ''
  text.toLocaleLowerCase

  const cartoon = listMovie?.cartoon?.filter(
    (movie: any) =>
      movie?.actor?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase()) ||
      movie?.category
        ?.toLocaleLowerCase()
        ?.includes(text.toLocaleLowerCase()) ||
      movie?.country?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase()) ||
      movie?.name?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase())
  )
  const rate = listMovie?.rate?.filter(
    (movie: any) =>
      movie?.actor?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase()) ||
      movie?.category
        ?.toLocaleLowerCase()
        ?.includes(text.toLocaleLowerCase()) ||
      movie?.country?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase()) ||
      movie?.name?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase())
  )
  const top = listMovie?.top?.filter(
    (movie: any) =>
      movie?.actor?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase()) ||
      movie?.category
        ?.toLocaleLowerCase()
        ?.includes(text.toLocaleLowerCase()) ||
      movie?.country?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase()) ||
      movie?.name?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase())
  )
  const trending = listMovie?.trending?.filter(
    (movie: any) =>
      movie?.actor?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase()) ||
      movie?.category
        ?.toLocaleLowerCase()
        ?.includes(text.toLocaleLowerCase()) ||
      movie?.country?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase()) ||
      movie?.name?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase())
  )
  const view = listMovie?.view?.filter(
    (movie: any) =>
      movie?.actor?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase()) ||
      movie?.category
        ?.toLocaleLowerCase()
        ?.includes(text.toLocaleLowerCase()) ||
      movie?.country?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase()) ||
      movie?.name?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase())
  )

  const listMovieTransformed = {
    cartoon,
    rate,
    top,
    trending,
    view,
  }

  return listMovieTransformed
}

const searchListMovieByType = (listMovie: any, input: string) => {
  const text = input ?? ''
  text.toLocaleLowerCase

  const cartoon = listMovie?.cartoon?.filter((movie: any) =>
    movie?.category?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase())
  )
  const rate = listMovie?.rate?.filter((movie: any) =>
    movie?.category?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase())
  )
  const top = listMovie?.top?.filter((movie: any) =>
    movie?.category?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase())
  )
  const trending = listMovie?.trending?.filter((movie: any) =>
    movie?.category?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase())
  )
  const view = listMovie?.view?.filter((movie: any) =>
    movie?.category?.toLocaleLowerCase()?.includes(text.toLocaleLowerCase())
  )

  const listMovieTransformed = {
    cartoon,
    rate,
    top,
    trending,
    view,
  }

  return listMovieTransformed
}

const getSum = (arr: any) => {
  let sum = 0
  arr?.map((e: any) => (sum += e))
  return sum
}

// const handleFilterCategoryFromDataRes = (value: number, products: any) => {
//   switch (value) {
//     case 0:
//       return products?.klm
//     case 1:
//       return products?.btc
//     case 2:
//       return products?.kkdn
//     case 3:
//       return products?.kn
//     case 4:
//       return products?.mhs
//     default:
//       return []
//   }
// }

const renderFullrAdress = (
  adress: any,
  ward: any,
  district: any,
  province: any
) => {
  let fullAdress = ''

  if (adress) {
    fullAdress += adress + ', '
  }

  if (ward) {
    fullAdress += ward + ', '
  }

  if (district) {
    fullAdress += district + ', '
  }

  if (province) {
    fullAdress += province + ', '
  }

  const tmp = fullAdress.trim()
  let res

  if (tmp[tmp?.length - 1] === ',') return tmp.slice(0, -1)
  else return res
}

export {
  createDayjsFromDMY,
  createStartDateTimeStampFromMoment,
  createEndDateTimeStampFromMoment,
  renderFullrAdress,
  create_ORDER_CODE,
  create_CODE,
  // handleFilterCategoryFromDataRes,
  getSum,
  reverseStringDay,
  getUnique,
  addOneMonthToMoment,
  cleanObj,
  cleanObject,
  create_UUID,
  createTimeStampFromMoment,
  handleCurrentPage,
  handleCurrentPageNew,
  renderService,
  renderDateStringDay,
  renderDateStringYear,
  renderInputBank,
  renderTimeOct,
  searchListMovie,
  searchListMovieByType,
  createStartDateDbFromOnlyYear,
  createEndDateDbFromOnlyYear,
}
