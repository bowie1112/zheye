import { ColumnProps, ImageProps } from './store'
import { UserDataProps } from './store/user'
import createMessage from './components/createMessage'
import columnImg from '@/assets/column.jpg'
import avatarImg from '@/assets/avatar.jpg'

export function generateFitUrl (data: ImageProps, width: number, height: number, format = ['m_pad']) {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}

export function addColumnAvatar (data: ColumnProps | UserDataProps, width: number, height: number) {
  if (data.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as ColumnProps
    data.avatar = {
      fitUrl: parseCol.title ? columnImg : avatarImg
    }
  }
}

interface CheckCondition {
  format?: string[];
  size?: number;
}
type ErrorType = 'size' | 'format' | null
export function beforeUploadCheck (file: File, condition: CheckCondition) {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}
export const commonUploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
  const { passed, error } = result
  if (error === 'format') {
    createMessage('上传图片只能是 JPG/PNG 格式!', 'error')
  }
  if (error === 'size') {
    createMessage('上传图片大小不能超过 1Mb', 'error')
  }
  return passed
}
interface TestProps {
    _id: string;
    name: string;
  }
const testData: TestProps[] = [{ _id: '1', name: 'a' }, { _id: '2', name: 'b' }]

export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}
const result = arrToObj(testData)
console.log(result)
export const objToArr = <T>(obj: {[key: string]: T}) => {
  return Object.keys(obj).map(key => obj[key])
}
const testData2: {[key: string]: TestProps} = {
  1: { _id: '1', name: 'a' },
  2: { _id: '2', name: 'b' }
}

const result2 = objToArr(testData2)
console.log(result2)
