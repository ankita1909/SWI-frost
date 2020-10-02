import axios from 'axios';
import {Config} from './config'
var api = axios.create({
    timeout: 20000,
    headers: {"Content-Type": "application/json"}
})
const CatchAxiosError = ErrorObject => {
    if (ErrorObject.response) {
        console.log(ErrorObject.response.headers)
        return `'Error: Api Responded with status code ${ErrorObject.response.status} Message : ${JSON.stringify(ErrorObject.response.data)}`
    }else {
        return (`Error : ${ErrorObject.message}`)
    }
}

const FetchData = ApiUrl => {
    return api({
        method: "GET",
        url: ApiUrl,
        headers: {
            "Content-Type" : "application/json",
        },
    }).then(response  => {
        return response.data
    }).catch(error => {
        throw CatchAxiosError(error)
    })
}

const PostData = (ApiUrl, body) => {
    return api({
        method: "POST",
        url: ApiUrl,
        headers: {
            "Content-Type" : "application/json",
        },
        data: body
    }).then(response  => {
        return response.data
    }).catch(error => {
        throw CatchAxiosError(error)
    })
}

export {FetchData, PostData}