import { Alerts } from "./constants/constants";


export const Live_url = 'http://13.202.202.231:8000/api/v1/';

// api names
export const API_url = {
    Register: `${Live_url}user/register`,
    Login: `${Live_url}user/login`,
    Get_product: `${Live_url}product/get`,
    Add_to_cart: `${Live_url}product/addCart`,
    Get_cart: `${Live_url}product/cart`,
    Remove_from_cart: `${Live_url}product/removeCart`,
    Reduce_quantty: `${Live_url}vendor/getvendor`,
    Add_address: `${Live_url}user/address`,
};


export const postApi = async (Url, Data, token) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: Data,
        redirect: 'follow',
    };


    //   console.log('URL ==>> ', Url);
    //   console.log('METHOD ==>> ', Method);
    //   console.log('DATA ==>> ', Data);
    //   console.log('requestOptions ==>> ', requestOptions);
    //   console.log('AuthToken ==>> ', myHeaders);
    //   console.log("Url res " +Url+" ",JSON.stringify(response));
    
        const response = await fetch(Url, requestOptions);
        return await response.json();
    
};

export const getApi = async (Url, token) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', "Bearer " + token);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: 'follow',
    };

    //   console.log('URL ==>> ', Url);
    //   console.log('METHOD ==>> ', Method);
    //   console.log("req ===> ",requestOptions);
    //   console.log(Url+"  ==> ",JSON.stringify(response))
    const response = await fetch(Url, requestOptions);
    return await response.json();
};


