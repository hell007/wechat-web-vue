import axios from '@/utils/axios'
import { obj2Param } from '@/utils'

/**
 * get方法
 * @param  {[type]} url
 * @param  {[type]} query
 * @return {[type]}
 */
export function fetchGet(url, query) {
  return axios({
    url: url + obj2Param(query), //mock在这里拦截,返回数据
    method: 'get'
  })
}

/**
 * post请求
 * @param  {[type]} url
 * @param  {[type]} form
 * @return {[type]}
 */
export function fetchPost(url, form) {
  return axios({
    url: url, //mock在这里拦截,返回数据
    method: 'post',
    data: form,
  })
}

/**
 * post上传文件或者图片,只需要传入file
 * @param  {[type]} file
 * @return {[type]}
 */
export function fetchUpload(file) {
  //文件读取完成后的回调函数
  let content = file.file;
  //创建一个新的FormData
  let formData = new FormData();
  // upload这个名字是后台给的
  formData.append("multipleFile", content);

  return axios({
    method: "post",
    //服务器上传地址
    url: `/flep/app/api/uploadCommon/upload`,
    data: formData,
    headers: {
      // 修改请求头
      "Content-Type": "multipart/form-data"
    }
  })
}

/**
 * 文件上传到知了
 * @param file
 */
export function upLoadZL(file) {
  //文件读取完成后的回调函数
  let content = file.file;
  //创建一个新的FormData
  let formData = new FormData();
  // upload这个名字是后台给的
  formData.append("multipleFile", content);
  formData.append("type", "flep");

  return axios({
    method: "post",
    //服务器上传地址
    url: "/csmpapp/fileUtilZlflep/uploadFile",
    data: formData,
    headers: {
      // 修改请求头
      "Content-Type": "multipart/form-data"
    }
  });
}
