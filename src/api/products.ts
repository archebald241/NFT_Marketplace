import axios from "axios";


export const fetchProducts = async (): Promise<Array<any>> => {
    try{
        const response = await axios.get('https://artisant.io/api/products')
        return response.data.data.products
    } catch (err){
        console.log(err)
        return []
    }
}