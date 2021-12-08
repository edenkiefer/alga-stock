import React, { useEffect, useState } from 'react';
import Table, { TableHeader } from '../../shared/Table'
import Swal from 'sweetalert2';
import ProductForm, { ProductCreator } from './ProductForm'
import { Product } from '../../shared/Table/Table.mockdata'
import { connect, useDispatch } from 'react-redux'
import * as ProductsActions from '../../redux/Products/Products.actions';
import { RootState, ThunkDispatch } from '../../redux';

const headers: TableHeader[] = [
  {key: 'name', value: 'Product'},
  {key: 'price', value: 'Price'},
  {key: 'stock', value: 'Available Stock', right: true}
]

declare interface ProductsCRUDProps {
  products: Product[]
}

const ProductsCRUD: React.FC<ProductsCRUDProps> = (props) => {
  const dispatch:ThunkDispatch = useDispatch();

  const showErrorAlert = 
    (error: Error) => Swal.fire('Oops!', error.message, 'error')
  
  const [updatingProject, setUpdatingProject] = useState<Product | undefined>(undefined)
  
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    dispatch(ProductsActions.getProducts())
      .catch(showErrorAlert);
  }

  const handleProductDetail = (product: Product) => {
    Swal.fire(
      'Product Details',
      `${product.name} costs $ ${product.price}. And we have ${product.stock} in stock `,
      'info'
    )
  }

  const handleProductSubmit = async (product: ProductCreator) => {
    dispatch(ProductsActions.insertNewProduct(product))
      .then(() => Swal.fire('Uhul!', 'Product successfully created', 'success'))
      .catch(showErrorAlert);
  }

  const handleProductUpdate = async (newProduct: Product) => {
    dispatch(ProductsActions.updateProduct(newProduct))
      .then(() => {
        setUpdatingProject(undefined)
        Swal.fire('Uhul!', 'Product successfully updated', 'success')
      })
      .catch(showErrorAlert);
  }

  const deleteSingleProduct = async(id: string) => {
    dispatch(ProductsActions.deleteProduct(id))
      .then(() => {
        setUpdatingProject(undefined)
        Swal.fire('Uhul!', 'Product successfully deleted', 'success')
      })
      .catch(showErrorAlert);
  }

  const handleProductDelete = (product: Product) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#09f',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete ${product.name}!`
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSingleProduct(product._id)
        Swal.fire(
          'Deleted!',
          'Your Product has been deleted.',
          'success'
        )
      }
    })
  }
  
  return <>
      <Table 
        headers={headers} 
        data={props.products}
        enableActions
        onEdit={setUpdatingProject}
        onDetail={handleProductDetail}
        onDelete={handleProductDelete}
      />
      <ProductForm 
        form={updatingProject}
        onSubmit={handleProductSubmit}
        onUpdate={handleProductUpdate}
      />
    </>
}

const mapStateToProps = (state: RootState) => ({
  products: state.products
})

export default connect(mapStateToProps)(ProductsCRUD)