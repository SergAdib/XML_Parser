import axios, { type AxiosInstance } from 'axios'

const endpoints = Object.freeze({
    GET_DATA: 'api/parsedata',
    PARSE_DATA: 'api/parsedata'
}) as any

const BASE_URL = 'https://localhost:7164/'

const axiosR: AxiosInstance = axios.create({
          baseURL: BASE_URL,
      })

// TODO:: add toastr and/or overlay for loading data

export const setUrl = (url: string) => {
    return endpoints[`${url}`] as string|| ''    
}

export const getData = (url: string, data?: any) => {
    return new Promise((resolve, reject) => {
        axiosR
            .get(`${url}`, { params: data })
            .then(success => {
                console.log(`GET: `, success)
                resolve(success.data)
            })
            .catch(error => {
                console.warn('GET error: ', error)
                reject(error)
            })
    })
}

export const postData = (url: string, data?: any) => {
    const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',                
            },
        }
    return new Promise((resolve, reject) => {
        axiosR
            .post(`${url}`, data, axiosConfig)
            .then(success => {
                console.log(`POST: `, success)
                resolve(success.data)
            })
            .catch(error => {
                console.warn('POST error: ', error)
                reject(error)
            })
    })
}

export default {
    getData,
    postData,    
}
