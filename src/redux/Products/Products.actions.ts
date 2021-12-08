import { Thunk } from '..'
import { ProductCreator } from '../../components/Products/ProductForm'
import { 
  getAllProducts, 
  updateSingleProduct,
  createSingleProduct,
  deleteSingleProduct
} from '../../services/Product.service'
import { Product } from '../../shared/Table/Table.mockdata'

export const updateProduct = 
  (newProduct: Product): Thunk =>
    async (dispatch) => {
      await updateSingleProduct(newProduct)
      dispatch(getProducts())
    } 

export const getProducts = 
  (): Thunk<Product[]> => 
    async (dispatch: any) => {
      const products = await getAllProducts()
      dispatch({
        type: 'FETCH_PRODUCTS',
        payload: products
      })
    }

export const insertNewProduct = 
  (product: ProductCreator): Thunk =>
    async (dispatch) => {
      await createSingleProduct(product)
      dispatch(getProducts())
    }

export const deleteProduct = 
  (_id: string): Thunk =>
    async (dispatch) => {
      await deleteSingleProduct(_id)
      dispatch(getProducts())
    }